import { clientConfig } from "@/lib/config/client";

export default function generateBitrixLeadFields(
	tel: string,
	name?: string,
	additionalInfo?: string,
	deliveryAddress?: string,
	totalPrice?: number,
) {
	function generateLeadTitle() {
		if (!name && !totalPrice)
			return `Запрос на регистрацию изменений в ТС с сайта ${clientConfig.siteUrl || "https://kitkars.ru"}`;
		else if (!totalPrice)
			return `Запрос на консультацию по товару с сайта ${clientConfig.siteUrl || "https://kitkars.ru"}`;
		else return `Заказ с сайта ${clientConfig.siteUrl || "https://kitkars.ru"}`;
	}

	const leadFields = {
		fields: {
			ADDRESS_CITY: deliveryAddress,
			COMMENTS: additionalInfo,
			HONORIFIC: `${clientConfig.siteUrl || "https://kitkars.ru"}`,
			SOURCE_DESCRIPTION: `${clientConfig.siteUrl || "https://kitkars.ru"}`,
			TITLE: generateLeadTitle(),
			NAME: name,
			OPPORTUNITY: totalPrice,
			PHONE: [{ VALUE: `${tel}` }],
		},
	};

	return leadFields;
}
