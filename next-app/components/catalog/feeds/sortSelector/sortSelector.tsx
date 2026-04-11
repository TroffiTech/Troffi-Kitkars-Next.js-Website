"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./sortSelector.module.scss";
import { arrowDownMiniSVG } from "@/components/shared/icons/icons";

export default function SortOrderSelector({
	currentSortOrder,
	sortOrderSetter,
}: {
	currentSortOrder: string;
	sortOrderSetter: Dispatch<SetStateAction<string>>;
}) {
	const [isExpanded, setIsExpanded] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	function controlEscapePress(e: KeyboardEvent) {
		if (e.code !== "Escape") return;
		setIsExpanded(false);
	}

	function handleClickOutside(e: MouseEvent) {
		if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
			setIsExpanded(false);
		}
	}

	function handleToggle() {
		setIsExpanded((prev) => !prev);
	}

	function handleSelect() {
		sortOrderSetter((prev) => {
			if (prev === "increase") return "decrease";
			else return "increase";
		});
		setIsExpanded(false);
	}

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		document.addEventListener("keydown", controlEscapePress);

		return () => {
			document.removeEventListener("click", handleClickOutside);
			document.removeEventListener("keydown", controlEscapePress);
		};
	}, []);

	const getDisplayText = (order: string) => {
		return order === "increase" ? "Сначала дешевле" : "Сначала дороже";
	};

	const getOppositeText = (order: string) => {
		return order === "increase" ? "Сначала дороже" : "Сначала дешевле";
	};

	return (
		<div
			ref={containerRef}
			className={`${styles.sortOrderSelector} ${isExpanded ? styles.expanded : ""}`}
			onClick={handleToggle}
		>
			<p>{getDisplayText(currentSortOrder)}</p>
			<div className={styles.icon}>{arrowDownMiniSVG}</div>
			<ul className={`${styles.expandedList} ${isExpanded ? styles.visible : ""}`}>
				<li onClick={handleSelect}>{getOppositeText(currentSortOrder)}</li>
			</ul>
		</div>
	);
}
