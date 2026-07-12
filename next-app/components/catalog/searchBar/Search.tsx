"use client";

import { useEffect, useState } from "react";

import styles from "./Search.module.scss";
import { glassSVG } from "@/components/shared/icons/icons";

type Props = {
	value: string;
	onSearch: (search: string) => void;
};

export default function Search({ value, onSearch }: Props) {
	const [search, setSearch] = useState(value);

	useEffect(() => {
		setSearch(value);
	}, [value]);

	function submit() {
		onSearch(search.trim());
	}

	return (
		<div className={styles.searchContainer}>
			<div className={styles.searchInputWrapper}>
				<input
					className={styles.searchInput}
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							submit();
						}
					}}
					placeholder="Поиск по каталогу"
					spellCheck={false}
				/>

				<button
					onClick={submit}
					className={styles.searchButton}
					aria-label="Найти"
				>
					{glassSVG}
				</button>
			</div>
		</div>
	);
}
