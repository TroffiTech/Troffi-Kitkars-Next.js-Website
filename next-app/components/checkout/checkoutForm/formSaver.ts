import { CheckoutFormData } from "@/types/formTypes";

const FORM_STORAGE_KEY = "checkout_form_data";
const FORM_TIMESTAMP_KEY = "checkout_form_timestamp";
const FORM_DATA_TTL = 24 * 60 * 60 * 1000;

export function saveFormData(data: CheckoutFormData) {
	if (typeof window !== "undefined") {
		try {
			localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data));
			localStorage.setItem(FORM_TIMESTAMP_KEY, Date.now().toString());
		} catch (error) {
			console.warn("Не удалось сохранить данные формы:", error);
		}
	}
}

export function clearFormData() {
	if (typeof window !== "undefined") {
		try {
			localStorage.removeItem(FORM_STORAGE_KEY);
			localStorage.removeItem(FORM_TIMESTAMP_KEY);
		} catch (error) {
			console.warn("Не удалось очистить данные формы:", error);
		}
	}
}

export function loadFormData(): CheckoutFormData | null {
	if (typeof window !== "undefined") {
		try {
			const savedData = localStorage.getItem(FORM_STORAGE_KEY);
			const timestamp = localStorage.getItem(FORM_TIMESTAMP_KEY);

			if (!savedData || !timestamp) return null;

			const savedTime = parseInt(timestamp);
			const currentTime = Date.now();

			if (currentTime - savedTime > FORM_DATA_TTL) {
				clearFormData();
				return null;
			}

			return JSON.parse(savedData);
		} catch (error) {
			console.warn("Не удалось загрузить данные формы:", error);
			return null;
		}
	}
	return null;
}
