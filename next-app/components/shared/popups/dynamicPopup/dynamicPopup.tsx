import { useContext, useEffect } from "react";
import styles from "./dynamicPopup.module.scss";
import { SmallPopupContext } from "@/hooks/smallPopupsProvider";

export default function DynamicPopup() {
    const setIsVisible = useContext(SmallPopupContext).setIsVisible;
    const isVisible = useContext(SmallPopupContext).isVisible;

    const popupText = useContext(SmallPopupContext).popupText;

    useEffect(() => {
        if (!setIsVisible) return;
        if (isVisible)
            setTimeout(() => {
                setIsVisible(false);
            }, 5000);
    });

    if (!isVisible) return;
    return (
        <div className={styles.dynamicPopup}>
            <p>{popupText}</p>
        </div>
    );
}
