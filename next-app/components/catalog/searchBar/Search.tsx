// Search.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { useRouter } from "next/navigation";
import { glassSVG } from "@/components/shared/icons/icons";

export default function Search() {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const navigator = useRouter();
	const [isSearching, setIsSearching] = useState(false);

	function handleClick() {
		const searchString: string | undefined = inputRef.current?.value.trim();
		if (!searchString || searchString.includes("%")) return;

		setIsSearching(true);
		setTimeout(() => {
			navigator.push(`/catalog/search/${encodeURIComponent(searchString)}`);
			setIsSearching(false);
		}, 300);
	}

	function handleEnterKeyDown(e: KeyboardEvent) {
		if (e.code !== "Enter") return;
		const searchString: string | undefined = inputRef.current?.value.trim();
		if (!searchString || searchString.includes("%")) return;

		setIsSearching(true);
		setTimeout(() => {
			navigator.push(`/catalog/search/${encodeURIComponent(searchString)}`);
			setIsSearching(false);
		}, 300);
	}

	useEffect(() => {
		document.body.addEventListener("keydown", handleEnterKeyDown);
		return () => document.body.removeEventListener("keydown", handleEnterKeyDown);
	});

	return (
		<div className={`${styles.searchContainer} ${isSearching ? styles.searching : ""}`}>
			<div className={styles.searchInputWrapper}>
				<input
					ref={inputRef}
					className={styles.searchInput}
					type="text"
					placeholder="Поиск по каталогу"
					spellCheck={false}
					disabled={isSearching}
				/>
				<button
					onClick={handleClick}
					className={styles.searchButton}
					disabled={isSearching}
					aria-label="Найти"
				>
					{glassSVG}
				</button>
			</div>
		</div>
	);
}
