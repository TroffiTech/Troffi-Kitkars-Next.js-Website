"use client";

import styles from "./DesctopHeader.module.scss";
import { Suspense, useEffect, useState } from "react";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

export default function DesctopHeader() {
	const [isScrolled, setIsScrolled] = useState(false);
	useEffect(() => {
		const onScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		onScroll();
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
			<TopBar />
			<Suspense fallback={null}>
				<BottomBar />
			</Suspense>
		</header>
	);
}
