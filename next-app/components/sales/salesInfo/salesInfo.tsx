"use client";

import CallBackButton, { LinkButton } from "@/components/shared/ctaButtons/ctaButtons";
import styles from "./salesInfo.module.scss";
import { useState } from "react";
import { arrowDownMiniSVG } from "@/components/shared/icons/icons";

export default function SalesInfo() {
    const [isExpanded, setIsExpanded] = useState(false);

    function handleClick() {
        setIsExpanded((prev) => !prev);
    }
    return (
        <article className={styles.salesInfo}>
            <div className={styles.topic}>Предложения</div>
            <div
                className={styles.textInner}
                style={{
                    maxHeight: `${isExpanded ? "1850px" : "120px"}`,
                }}>
                <h1>
                    Наши акции: <br />
                    <span>Мы регулярно обновляем акционные предложения</span>
                </h1>
                <div className={styles.ctaBlock}>
                    <ul>
                        <li>
                            <p>Свяжитесь с нами, чтобы узнать больше</p>
                            <CallBackButton text='Перезвоните мне' />
                        </li>
                        <li>
                            <p>Или следите в социальных сетях</p>
                            <LinkButton text='Наш телеграм' link='/' />
                        </li>
                    </ul>
                </div>
            </div>
            <button onClick={handleClick} className={styles.expandButton}>
                <div
                    style={{
                        transform: `${isExpanded ? "rotate(180deg)" : "none"}`,
                        transition: "all 0.2s ease",
                    }}>
                    {arrowDownMiniSVG}
                </div>
            </button>
        </article>
    );
}
