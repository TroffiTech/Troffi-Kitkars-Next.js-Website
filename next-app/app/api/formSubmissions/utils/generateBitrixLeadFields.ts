export default function generateBitrixLeadFields(
	tel: string,
	name?: string,
	additionalInfo?: string,
	deliveryAddress?: string,
	totalPrice?: number,
) {
	function generateLeadTitle() {
		if (!name && !totalPrice)
			return `Запрос на регистрацию изменений в ТС с сайта ${process.env.DOMEN || "https://kitkars.ru"}`;
		else if (!totalPrice)
			return `Запрос на консультацию по товару с сайта ${process.env.DOMEN || "https://kitkars.ru"}`;
		else return `Заказ с сайта ${process.env.DOMEN || "https://kitkars.ru"}`;
	}

	const leadFields = {
		fields: {
			ADDRESS_CITY: deliveryAddress,
			COMMENTS: additionalInfo,
			HONORIFIC: `${process.env.DOMEN || "https://kitkars.ru"}`,
			SOURCE_DESCRIPTION: `${process.env.DOMEN || "https://kitkars.ru"}`,
			TITLE: generateLeadTitle(),
			NAME: name,
			OPPORTUNITY: totalPrice,
			PHONE: [{ VALUE: `${tel}` }],
		},
	};

	return leadFields;
}
