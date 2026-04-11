"use client";

import { useRef, FormEvent, useContext } from "react";
import styles from "./FormRegisterChanges.module.scss";
import { usePhoneMask } from "@/hooks/usePhoneMask";
import { SmallPopupContext } from "@/hooks/smallPopupsProvider";

export function FormRegisterChangesVariant() {
	const { setIsVisible: setIsPopupVisible, setPopupText } = useContext(SmallPopupContext);

	const phoneInputRef = useRef<HTMLInputElement>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const { phoneValue, handlePhoneChange, getRawPhone } = usePhoneMask();

	const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target;
		const value = input.value;
		const cursorPosition = input.selectionStart || 0;

		const { newCursorPosition } = handlePhoneChange(value, cursorPosition);

		// Сохраняем позицию курсора
		setTimeout(() => {
			if (phoneInputRef.current) {
				phoneInputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
			}
		}, 0);
	};

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
				if (phoneInputRef.current) {
					phoneInputRef.current.setSelectionRange(adjustedPosition, adjustedPosition);
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
				if (phoneInputRef.current) {
					phoneInputRef.current.setSelectionRange(formatted.length, formatted.length);
				}
			}, 0);
		}
	};

	const handlePhoneFocus = () => {
		// При фокусе устанавливаем курсор после +7
		if (phoneValue.length <= 4) {
			setTimeout(() => {
				if (phoneInputRef.current) {
					phoneInputRef.current.setSelectionRange(4, 4);
				}
			}, 0);
		}
	};

	const clearForm = () => {
		// Очищаем форму
		if (formRef.current) {
			formRef.current.reset();
		}

		// Сбрасываем маску телефона
		handlePhoneChange("+7 ", 4);

		// Очищаем localStorage для этой формы
		const formKeys = ["consultation_name", "consultation_phone", "consultation_message"];

		formKeys.forEach((key) => {
			localStorage.removeItem(key);
		});
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const nameValue = formData.get("name") as string;
		const messageValue = formData.get("message") as string;
		const rawPhone = getRawPhone(phoneValue);

		try {
			const response = await fetch("/api/formSubmissions/registrationSubmission", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					nameValue,
					telValue: rawPhone,
					messageValue,
				}),
			});

			if (!response.ok) {
				throw new Error("Ошибка отправки формы");
			}

			setPopupText!("Ваш запрос успешно отправлен!");
			setIsPopupVisible!(true);
		} catch (error) {
			console.error("Ошибка при отправке формы:", error);
			setPopupText!("Отправка формы не выполнена! Попробуйте позже");
			setIsPopupVisible!(true);
		} finally {
			// Всегда очищаем форму после отправки (и успешной, и неуспешной)
			clearForm();
		}
	};

	return (
		<form ref={formRef} className={styles.formVariant} onSubmit={handleSubmit}>
			<div className={styles.formVariant_ctaContainer}>
				<h3>
					Получите <span>консультацию</span>
				</h3>
				<p>Оставьте заявку и наш специалист свяжется с вами в течение 15 минут</p>
			</div>

			<div className={styles.formVariant_inputGroup}>
				<div className={styles.inputRow}>
					<div className={styles.inputField}>
						<label htmlFor="name">Ваше имя</label>
						<input type="text" id="name" name="name" placeholder="Иван Иванов" required />
					</div>
					<div className={styles.inputField}>
						<label htmlFor="phone">Телефон</label>
						<input
							ref={phoneInputRef}
							type="tel"
							id="phone"
							name="phone"
							value={phoneValue}
							onChange={handlePhoneInput}
							onKeyDown={handlePhoneKeyDown}
							onPaste={handlePhonePaste}
							onFocus={handlePhoneFocus}
							placeholder="+7 (999) 999-99-99"
							required
							inputMode="numeric"
						/>
					</div>
				</div>

				<div className={styles.inputField}>
					<label htmlFor="message">Сообщение</label>
					<input
						type="text"
						id="message"
						name="message"
						placeholder="Расскажите о вашем автомобиле..."
					/>
				</div>

				<button type="submit" className={styles.submitButton}>
					Отправить заявку
				</button>

				<p className={styles.descriptionText}>
					Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
				</p>
			</div>
		</form>
	);
}
