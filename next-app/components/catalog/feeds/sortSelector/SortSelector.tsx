"use client";

import { useEffect, useRef, useState } from "react";

import { arrowDownMiniSVG } from "@/components/shared/icons/icons";

import styles from "./SortSelector.module.scss";

export type SortOrder = "increase" | "decrease";

type SortOption = {
	value: SortOrder;
	label: string;
};

const options: SortOption[] = [
	{
		value: "increase",
		label: "Сначала дешевле",
	},
	{
		value: "decrease",
		label: "Сначала дороже",
	},
];

type SortSelectorProps = {
	value: SortOrder;
	onChange: (value: SortOrder) => void;
};

export default function SortSelector({ value, onChange }: SortSelectorProps) {
	const [isOpen, setIsOpen] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}

		function handleEscape(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, []);

	const currentOption =
		options.find((option) => option.value === value) ?? options[0];

	return (
		<div
			ref={containerRef}
			className={`${styles.sortSelector} ${isOpen ? styles.expanded : ""}`}
		>
			<button
				type="button"
				className={styles.trigger}
				onClick={() => setIsOpen((prev) => !prev)}
			>
				<span>{currentOption.label}</span>

				<span className={`${styles.icon} ${isOpen ? styles.rotated : ""}`}>
					{arrowDownMiniSVG}
				</span>
			</button>

			{isOpen && (
				<ul className={styles.menu}>
					{options.map((option) => (
						<li key={option.value}>
							<button
								type="button"
								className={`${styles.option} ${
									option.value === value ? styles.active : ""
								}`}
								onClick={() => {
									onChange(option.value);
									setIsOpen(false);
								}}
							>
								{option.label}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
