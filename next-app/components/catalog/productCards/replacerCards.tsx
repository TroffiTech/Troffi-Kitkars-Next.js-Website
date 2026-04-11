"use client";

import CallBackButton, { LinkButton } from "@/components/shared/ctaButtons/ctaButtons";
import styles from "./productCards.module.scss";

export default function CardReplacerFirstVariant() {
    return (
        <div className={styles.сardReplacerFirstVariant}>
            <h3>Нужна Консультация?</h3>
            <p>Звоните, Мы поможем Вам!</p>

            <CallBackButton text='Заказать звонок' />
        </div>
    );
}

export function CardReplacerSecondVariant() {
    return (
        <div className={styles.сardReplacerSecondVariant}>
            <h3>Еще больше товаров в каталоге!</h3>
            <p>Качественная продукция</p>
            <p>Низкие цены</p>
            <LinkButton text='Смотреть' link='/catalog' />
        </div>
    );
}
