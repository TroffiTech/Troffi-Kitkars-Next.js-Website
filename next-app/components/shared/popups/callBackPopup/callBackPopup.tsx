import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./callBackPopup.module.scss";
import { xMarkSVG } from "../../icons/icons";
import isNameStringValid from "@/lib/validators/validateNameInput";
import isTelStringValid from "@/lib/validators/validateTelInput";
import { usePhoneMask } from "@/hooks/usePhoneMask";
import { SmallPopupContext } from "@/hooks/smallPopupsProvider";

function CallBackPopupContent({ closePopup }: { closePopup: () => void }) {
	const { setIsVisible: setIsPopupVisible, setPopupText } = useContext(SmallPopupContext);

	const inputNameRef = useRef<HTMLInputElement>(null);
	const inputTelRef = useRef<HTMLInputElement>(null);

	const [isTelValid, setIsTelValid] = useState(true);
	const [isNameValid, setIsNameValid] = useState(true);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { phoneValue, handlePhoneChange, getRawPhone } = usePhoneMask();

	useEffect(() => {
		document.body.classList.add("blockScroll");
		return () => document.body.classList.remove("blockScroll");
	}, []);

	// Фокус на поле телефона при открытии
	useEffect(() => {
		if (inputTelRef.current) {
			inputTelRef.current.focus();
			// Устанавливаем курсор после +7
			inputTelRef.current.setSelectionRange(4, 4);
		}
	}, []);

	function clearFields() {
		if (!inputNameRef.current || !inputTelRef.current) return;
		inputNameRef.current.value = "";
		// Сбрасываем маску телефона
		const { formatted } = handlePhoneChange("+7 ", 4);
		if (inputTelRef.current) {
			inputTelRef.current.value = formatted;
		}
	}

	// Обработчик изменения телефона с маской
	const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target;
		const value = input.value;
		const cursorPosition = input.selectionStart || 0;

		const { newCursorPosition } = handlePhoneChange(value, cursorPosition);

		// Сохраняем позицию курсора
		setTimeout(() => {
			if (inputTelRef.current) {
				inputTelRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
			}
		}, 0);
	};

	// Обработчик событий клавиатуры для корректного удаления
	const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Backspace") {
			const input = e.target as HTMLInputElement;
			const value = input.value;
			const cursorPosition = input.selectionStart || 0;

			// Если курсор в начале маски, блокируем удаление
			if (cursorPosition <= 4) {
				e.preventDefault();
				return;
			}

			// Получаем текущее значение до backspace
			const newValue = value.slice(0, cursorPosition - 1) + value.slice(cursorPosition);
			const newCursorPosition = cursorPosition - 1;

			const { newCursorPosition: adjustedPosition } = handlePhoneChange(
				newValue,
				newCursorPosition,
				true // Флаг backspace
			);

			// Устанавливаем скорректированную позицию курсора
			setTimeout(() => {
				if (inputTelRef.current) {
					inputTelRef.current.setSelectionRange(adjustedPosition, adjustedPosition);
				}
			}, 0);

			e.preventDefault(); // Предотвращаем стандартное поведение
		}
	};

	// Обработчик вставки текста (paste)
	const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const pastedText = e.clipboardData.getData("text");
		const numbers = pastedText.replace(/\D/g, "");

		if (numbers) {
			const currentValue = phoneValue.replace(/\D/g, "");
			const newValue = "+7 " + (currentValue.slice(2) + numbers).slice(0, 10);

			const { formatted } = handlePhoneChange(newValue);

			// Ставим курсор в конец
			setTimeout(() => {
				if (inputTelRef.current) {
					inputTelRef.current.setSelectionRange(formatted.length, formatted.length);
				}
			}, 0);
		}
	};

	const handlePhoneFocus = () => {
		// При фокусе устанавливаем курсор после +7
		if (phoneValue.length <= 4) {
			setTimeout(() => {
				if (inputTelRef.current) {
					inputTelRef.current.setSelectionRange(4, 4);
				}
			}, 0);
		}
	};

	async function submit(e: FormEvent) {
		e.preventDefault();

		if (!inputNameRef.current || !inputTelRef.current) return;

		const nameValue = inputNameRef.current.value;
		const rawPhoneValue = getRawPhone(phoneValue);

		let isFromValid = 1;

		// validate name
		if (!isNameStringValid(nameValue)) {
			isFromValid *= 0;
			setTimeout(() => {
				setIsNameValid(true);
			}, 3000);
			setIsNameValid(false);
		}

		// validate tel
		if (!isTelStringValid(rawPhoneValue)) {
			isFromValid *= 0;
			setTimeout(() => {
				setIsTelValid(true);
			}, 3000);
			setIsTelValid(false);
		}

		if (!isFromValid) {
			return;
		}

		setIsSubmitted(true);

		try {
			const response = await fetch("/api/formSubmissions/consultationSubmission", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					telValue: rawPhoneValue,
					nameValue,
				}),
			});

			if (!response.ok) {
				throw new Error("Ошибка отправки формы");
			}

			// Показываем успешное сообщение только если контекст доступен
			if (setPopupText && setIsPopupVisible) {
				setPopupText("Ваше обращение отправлено! Мы свяжемся с Вами в ближайшее время.");
				setIsPopupVisible(true);
			}
		} catch (error) {
			console.error(error);
			// Показываем сообщение об ошибке только если контекст доступен
			if (setPopupText && setIsPopupVisible) {
				setPopupText("Отправка формы не выполнена! Попробуйте позже");
				setIsPopupVisible(true);
			}
		} finally {
			clearFields();
			setIsSubmitted(false);
			closePopup();
		}
	}

	return (
		<div className={styles.callBackPopup}>
			<form onSubmit={submit}>
				<button type="button" className={styles.closeButton} onClick={closePopup}>
					{xMarkSVG}
				</button>

				<h3>Перезвоните мне</h3>
				<p>Оставьте ваш номер и мы вам перезвоним в ближайшее время</p>

				<div className={styles.inputGroup}>
					<div className={`${styles.inputField} ${!isNameValid ? styles.error : ""}`}>
						<label htmlFor="name">
							{!isNameValid ? "Корректно заполните поле" : "Введите имя"}
						</label>
						<input
							spellCheck={false}
							name="name"
							ref={inputNameRef}
							type="text"
							placeholder="Иван Иванов"
							required
						/>
					</div>

					<div className={`${styles.inputField} ${!isTelValid ? styles.error : ""}`}>
						<label htmlFor="tel">
							{!isTelValid ? "Корректно заполните поле" : "Введите номер телефона"}
						</label>
						<input
							spellCheck={false}
							name="tel"
							ref={inputTelRef}
							type="tel"
							value={phoneValue}
							onChange={handlePhoneInput}
							onKeyDown={handlePhoneKeyDown}
							onPaste={handlePhonePaste}
							onFocus={handlePhoneFocus}
							placeholder="+7 (999) 999-99-99"
							inputMode="numeric"
							required
						/>
					</div>
				</div>

				<button
					type="submit"
					className={`${styles.submitButton} ${isSubmitted ? styles.success : ""}`}
					disabled={isSubmitted}
				>
					{isSubmitted ? "Отправка..." : "Отправить"}
				</button>

				<p className={styles.policyWarn}>
					Подтверждая отправку формы Вы соглашаетесь с политикой использования персональных данных
				</p>
			</form>
		</div>
	);
}

export default function CallBackPopup({ closePopup }: { closePopup: () => void }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	if (!mounted) return null;

	return createPortal(<CallBackPopupContent closePopup={closePopup} />, document.body);
}
