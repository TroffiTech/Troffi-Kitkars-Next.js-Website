"use client";

import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { checkIsMobile } from "@/lib/deviceTypeChecker";
import { usePathname } from "next/navigation";
import MobileHeader from "./mobileHeader/mobileHeader";
import DesctopHeader from "./desktopHeader/desctopHeader";

export default function Header() {
	const pathname = usePathname();
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [isScrolled, setIsScrolled] = useState(false);

	function setView() {
		if (checkIsMobile() || window.innerWidth <= 1100) setIsMobile(true);
		else setIsMobile(false);
	}

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", setView);

		setView();

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", setView);
		};
	}, []);

	const headerClass = `${styles.header} ${isScrolled ? styles.scrolled : ""}`;

	return (
		<header className={headerClass}>
			{isMobile && (
				<MobileHeader
					isMenuVisible={isMenuVisible}
					setIsMenuVisible={setIsMenuVisible}
				/>
			)}
			{!isMobile && <DesctopHeader pathname={pathname} />}
		</header>
	);
}
