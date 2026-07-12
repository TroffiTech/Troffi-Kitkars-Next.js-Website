import { useEffect, useState } from "react";
import styles from "./MenuPopup.module.scss";
import MenuCategories from "./MenuCategories";
import MenuInfo from "./MenuInfo";
import MenuContacts from "./MenuContacts";

export function MenuPopup({ isOpen }: { isOpen: boolean }) {
	const [shouldRender, setShouldRender] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setShouldRender(true);
			document.body.classList.add("blockScroll");
			return;
		}
		document.body.classList.remove("blockScroll");
		const timer = setTimeout(() => {
			setShouldRender(false);
		}, 400);

		return () => clearTimeout(timer);
	}, [isOpen]);

	if (!shouldRender && !isOpen) return null;

	return (
		<div
			className={`${styles.menuPopup} ${isOpen ? styles.menuEnter : styles.menuExit}`}
		>
			<div className={styles.menuPopup_innerContent}>
				<MenuCategories />
				<MenuInfo />
				<MenuContacts />
			</div>
		</div>
	);
}
