import { Dispatch, SetStateAction } from "react";
import Logo from "../logo/Logo";
import { MenuPopup, MenuTrigger } from "./menu/Menu";
import styles from "../Header.module.scss";

async function fetcher(url: string) {
	const res = await fetch(url);
	return await res.json();
}

export default function MobileHeader({
	isMenuVisible,
	setIsMenuVisible,
}: {
	isMenuVisible: boolean;
	setIsMenuVisible: Dispatch<SetStateAction<boolean>>;
}) {
	return (
		<div className={styles.mobileHeader}>
			<Logo />
			<MenuTrigger
				isVisible={isMenuVisible}
				stateDriver={() => {
					setIsMenuVisible((prev) => !prev);
				}}
			/>
			<MenuPopup isVisible={isMenuVisible} fetcher={fetcher} />
		</div>
	);
}
