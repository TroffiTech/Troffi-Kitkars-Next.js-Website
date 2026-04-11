export default function generateBitrixLeadFields(
    tel: string,
    name?: string,
    additionalInfo?: string,
    deliveryAddress?: string,
    totalPrice?: number
) {
    function generateLeadTitle() {
        if (!name && !totalPrice)
            return `Запрос на регистрацию изменений в ТС с сайта ${process.env.NEXT_PUBLIC_DOMEN}`;
        else if (!totalPrice)
            return `Запрос на консультацию по товару с сайта ${process.env.NEXT_PUBLIC_DOMEN}`;
        else return `Заказ с сайта ${process.env.NEXT_PUBLIC_DOMEN}`;
    }

    const leadFields = {
        fields: {
            ADDRESS_CITY: deliveryAddress,
            COMMENTS: additionalInfo,
            HONORIFIC: `${process.env.NEXT_PUBLIC_DOMEN}`,
            SOURCE_DESCRIPTION: `${process.env.NEXT_PUBLIC_DOMEN}`,
            TITLE: generateLeadTitle(),
            NAME: name,
            OPPORTUNITY: totalPrice,
            PHONE: [{ VALUE: `${tel}` }],
        },
    };

    return leadFields;
}
