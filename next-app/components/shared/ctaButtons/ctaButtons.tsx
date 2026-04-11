"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./ctaButtons.module.scss";
import CallBackPopup from "../popups/callBackPopup/callBackPopup";

interface CallBackButtonProps {
	text: string;
	variant?: "default" | "minimal";
}

export default function CallBackButton({ text }: CallBackButtonProps) {
	const [isVisible, setIsVisible] = useState(false);

	function openPopup() {
		setIsVisible(true);
	}

	function closePopup() {
		setIsVisible(false);
	}

	return (
		<>
			{isVisible && <CallBackPopup closePopup={closePopup} />}
			<div className={styles.callBackButton_background}>
				<button onClick={openPopup} className={styles.callBackButton}>
					<p>{text}</p>
				</button>
			</div>
		</>
	);
}

interface LinkButtonProps {
	link: string;
	text: string;
	variant?: "default" | "dark";
}

export function LinkButton({ link, text, variant = "default" }: LinkButtonProps) {
	const containerClass =
		variant === "dark"
			? `${styles.linkButton_container} ${styles.linkButton_dark}`
			: styles.linkButton_container;

	return (
		<div className={containerClass}>
			<Link className={styles.linkButton} href={link}>
				{text}
			</Link>
		</div>
	);
}
