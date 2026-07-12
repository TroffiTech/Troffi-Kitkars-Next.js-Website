"use client";

import { useState } from "react";

import Logo from "../logo/Logo";
import { MenuPopup } from "./menu/MenuPopup";

import styles from "./MobileHeader.module.scss";
import MenuTrigger from "./menu/MenuTrigger";

export default function MobileHeader() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className={styles.mobileHeader}>
			<Logo />
			<MenuTrigger isOpen={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
			<MenuPopup isOpen={menuOpen} />
		</header>
	);
}
