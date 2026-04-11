// CheckoutForm.tsx
import { useDispatch, useSelector } from "react-redux";
import styles from "./checkoutForm.module.scss";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { clearFormData, loadFormData, saveFormData } from "./formSaver";
import isNameStringValid from "@/lib/validators/validateNameInput";
import isTelStringValid from "@/lib/validators/validateTelInput";
import { SmallPopupContext } from "@/hooks/smallPopupsProvider";
import { CheckoutFormData } from "@/types/formTypes";
import { resetCart } from "@/store/cart/cartSlice";
import { RootState } from "@/store/store";
import debounce from "@/lib/debounce";
import { usePhoneMask } from "@/hooks/usePhoneMask";

export default function CheckoutForm() {
	const dispatch = useDispatch();
	const cart = useSelector((state: RootState) => state.cart.value);
	const navigator = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const phoneInputRef = useRef<HTMLInputElement>(null);

	const { phoneValue, handlePhoneChange, getRawPhone } = usePhoneMask();

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
		reset,
		watch,
		setValue,
		trigger,
	} = useForm<CheckoutFormData>({
		mode: "onBlur",
		defaultValues: {
			name: "",
			tel: "",
			address: "",
			additional: "",
		},
	});

	const setIsPopupVisible = useContext(SmallPopupContext).setIsVisible;
	const setPopupText = useContext(SmallPopupContext).setPopupText;

	const debouncedSaveRef = useCallback(
		debounce((data: CheckoutFormData) => {
			if (isDirty) saveFormData(data);
		}, 500),
		[isDirty]
	);

	const formData = watch();
	useEffect(() => {
		debouncedSaveRef(formData);
	}, [formData, debouncedSaveRef]);

	useEffect(() => {
		const savedData = loadFormData();
		if (savedData) {
			reset(savedData);
			// Восстанавливаем маску телефона если есть сохраненное значение
			if (savedData.tel) {
				const rawPhone = savedData.tel;
				setValue("tel", rawPhone, { shouldValidate: true });
			}
		}
	}, [reset, setValue, handlePhoneChange]);

	// Обработчик изменения телефона с маской
	const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target;
		const value = input.value;
		const cursorPosition = input.selectionStart || 0;

		const { formatted, newCursorPosition } = handlePhoneChange(value, cursorPosition);

		// Устанавливаем сырое значение в форму
		const rawPhone = getRawPhone(formatted);
		setValue("tel", rawPhone, { shouldValidate: true });

		// Триггерим валидацию
		setTimeout(() => trigger("tel"), 0);

		// Сохраняем позицию курсора
		setTimeout(() => {
			if (phoneInputRef.current) {
				phoneInputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
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

			const { formatted, newCursorPosition: adjustedPosition } = handlePhoneChange(
				newValue,
				newCursorPosition,
				true // Флаг backspace
			);

			// Устанавливаем сырое значение в форму
			const rawPhone = getRawPhone(formatted);
			setValue("tel", rawPhone, { shouldValidate: true });

			// Устанавливаем скорректированную позицию курсора
			setTimeout(() => {
				if (phoneInputRef.current) {
					phoneInputRef.current.setSelectionRange(adjustedPosition, adjustedPosition);
				}
			}, 0);

			e.preventDefault(); // Предотвращаем стандартное поведение
		}
	};

	function showSuccessPopup() {
		if (!setIsPopupVisible || !setPopupText) return;
		setPopupText(`Ваш запрос успешно отправлен! 
      Вы будете перенаправлены на главную страницу`);
		setIsPopupVisible(true);
	}

	function showErrorPopup() {
		if (!setIsPopupVisible || !setPopupText) return;
		setPopupText(`Невозможно выполнить запрос.
       Попробуйте позже`);
		setIsPopupVisible(true);
	}

	const onSubmit = async (data: CheckoutFormData) => {
		if (isSubmitting) return;

		setIsSubmitting(true);

		try {
			const response = await fetch("/api/formSubmissions/orderSubmission", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					telValue: data.tel,
					nameValue: data.name,
					additionalInfoValue: data.additional,
					deliveryAddressValue: data.address,
					cart,
				}),
			});

			if (!response.ok) {
				showErrorPopup();
				return;
			}

			showSuccessPopup();
			clearFormData();
			dispatch(resetCart());
			reset();
			// Сбрасываем маску телефона
			handlePhoneChange("+7 ");

			setTimeout(() => {
				navigator.push("/");
			}, 2000);
		} catch (error) {
			console.error("Ошибка при отправке формы:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Кастомная валидация для телефона с учетом маски
	const validatePhone = (value: string) => {
		if (!value) return "Телефон обязателен";

		const rawValue = value.replace(/\D/g, "");
		if (rawValue.length !== 11) return "Номер должен содержать 11 цифр";

		if (!isTelStringValid(rawValue)) return "Введите номер корректно";

		return true;
	};

	return (
		<form className={styles.checkoutForm} onSubmit={handleSubmit(onSubmit)}>
			<h2>Контактная информация</h2>

			<div className={styles.formFields}>
				<div className={`${styles.inputGroup} ${errors.name ? styles.error : ""}`}>
					<label htmlFor="name">{errors.name ? errors.name.message : "Ваше имя*"}</label>
					<input
						{...register("name", {
							required: "Имя обязательно",
							minLength: {
								value: 3,
								message: "Минимум 3 символа",
							},
							maxLength: {
								value: 50,
								message: "Максимум 50 символов",
							},
							validate: {
								cyrillic: (value) => isNameStringValid(value) || "Используйте кириллицу",
							},
						})}
						placeholder="Иван Петров"
						type="text"
						spellCheck="false"
						disabled={isSubmitting}
					/>
					{errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
				</div>

				<div className={`${styles.inputGroup} ${errors.tel ? styles.error : ""}`}>
					<label htmlFor="tel">{errors.tel ? errors.tel.message : "Контактный номер*"}</label>
					<input
						ref={phoneInputRef}
						value={phoneValue}
						onChange={handlePhoneInputChange}
						onKeyDown={handlePhoneKeyDown}
						placeholder="+7 (999) 123-45-67"
						type="tel"
						disabled={isSubmitting}
						// Скрываем валидацию браузера для кастомной маски
						inputMode="numeric"
					/>
					<input
						type="hidden"
						{...register("tel", {
							required: "Телефон обязателен",
							validate: {
								valid: validatePhone,
							},
						})}
					/>
					{errors.tel && <span className={styles.errorMessage}>{errors.tel.message}</span>}
				</div>

				<div className={styles.inputGroup}>
					<label htmlFor="address">Адрес доставки</label>
					<input
						{...register("address")}
						type="text"
						placeholder="Улица, дом, квартира"
						disabled={isSubmitting}
					/>
				</div>

				<div className={`${styles.inputGroup} ${errors.additional ? styles.error : ""}`}>
					<label htmlFor="additional">
						Дополнительная информация
						{errors.additional && ` - ${errors.additional.message}`}
					</label>
					<textarea
						className={styles.additionalInput}
						{...register("additional", {
							maxLength: {
								value: 500,
								message: "Максимум 500 символов",
							},
						})}
						placeholder="Дополнительные пожелания к заказу..."
						disabled={isSubmitting}
					/>
					{errors.additional && (
						<span className={styles.errorMessage}>{errors.additional.message}</span>
					)}
				</div>
			</div>

			<div className={styles.submitSection}>
				<button
					type="submit"
					className={`${styles.submitButton} ${styles.beamAnimation}`}
					disabled={isSubmitting || !isDirty || !isValid}
				>
					{isSubmitting ? "Отправка..." : "Заказать"}
				</button>

				<p className={styles.policyWarn}>
					Подтверждая отправку формы Вы соглашаетесь с политикой использования персональных данных
				</p>
			</div>
		</form>
	);
}
