// usePhoneMask.ts
import { useState, useCallback, useRef } from "react";

export function usePhoneMask(initialValue: string = "+7 ") {
	const [phoneValue, setPhoneValue] = useState(initialValue);
	const previousValueRef = useRef(initialValue);

	const formatPhoneNumber = useCallback((value: string): string => {
		// Удаляем все нецифровые символы, кроме плюса в начале
		const numbers = value.startsWith("+")
			? "+" + value.slice(1).replace(/\D/g, "")
			: value.replace(/\D/g, "");

		if (numbers === "+" || numbers.length === 0) {
			return "+7 ";
		}

		// Если номер не начинается с 7, добавляем 7 в начало (после +)
		const numbersWithPrefix = numbers.startsWith("+7") ? numbers : "+7" + numbers.slice(1);
		const numbersWithoutPrefix = numbersWithPrefix.slice(2); // Убираем "+7"

		let formatted = "+7 ";

		if (numbersWithoutPrefix.length > 0) {
			formatted += "(" + numbersWithoutPrefix.slice(0, 3);
		}

		if (numbersWithoutPrefix.length >= 3) {
			formatted += ") " + numbersWithoutPrefix.slice(3, 6);
		}

		if (numbersWithoutPrefix.length >= 6) {
			formatted += "-" + numbersWithoutPrefix.slice(6, 8);
		}

		if (numbersWithoutPrefix.length >= 8) {
			formatted += "-" + numbersWithoutPrefix.slice(8, 10);
		}

		return formatted;
	}, []);

	const handlePhoneChange = useCallback(
		(
			value: string,
			cursorPosition?: number,
			isBackspace?: boolean
		): {
			formatted: string;
			newCursorPosition: number;
		} => {
			const previousValue = previousValueRef.current;
			const formatted = formatPhoneNumber(value);

			let newCursorPosition = cursorPosition || 0;

			// Логика для корректного позиционирования курсора при удалении
			if (isBackspace && cursorPosition) {
				// При удалении стараемся сохранить позицию курсора
				const deletedChar = previousValue[cursorPosition - 1];
				if (deletedChar && !/\d/.test(deletedChar)) {
					// Если удаляем символ маски, перемещаем курсор назад
					newCursorPosition = cursorPosition - 1;
				}
			} else if (previousValue && formatted !== previousValue && cursorPosition) {
				// Логика для добавления символов
				const addedChars = formatted.length - previousValue.length;

				if (addedChars > 0) {
					// При добавлении символов маски перемещаем курсор вперед
					newCursorPosition = cursorPosition + addedChars;
				} else if (addedChars < 0) {
					// При удалении перемещаем курсор соответственно
					newCursorPosition = cursorPosition + addedChars;
				}

				// Ограничиваем позицию курсора допустимыми пределами
				newCursorPosition = Math.max(4, Math.min(newCursorPosition, formatted.length));
			}

			// Корректируем позицию курсора для избежания позиций внутри групп маски
			if (newCursorPosition <= 4) {
				newCursorPosition = 4; // После "+7 "
			} else if (newCursorPosition === 6 || newCursorPosition === 7) {
				newCursorPosition = 7; // После "("
			} else if (newCursorPosition === 10) {
				newCursorPosition = 11; // После ") "
			} else if (newCursorPosition === 13 || newCursorPosition === 14) {
				newCursorPosition = 14; // После "-"
			} else if (newCursorPosition === 16 || newCursorPosition === 17) {
				newCursorPosition = 17; // После "-"
			}

			previousValueRef.current = formatted;
			setPhoneValue(formatted);

			return { formatted, newCursorPosition };
		},
		[formatPhoneNumber]
	);

	const getRawPhone = useCallback((formattedPhone: string): string => {
		const raw = formattedPhone.replace(/\D/g, "");
		return raw.startsWith("7") ? raw : "7" + raw;
	}, []);

	return {
		phoneValue,
		handlePhoneChange,
		getRawPhone,
	};
}
