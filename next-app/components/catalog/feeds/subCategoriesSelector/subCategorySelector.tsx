import useSWR from "swr";
import { useEffect, useState } from "react";
import Link from "next/link";

import styles from "./subCategorySelector.module.scss";
import { Category } from "@/types/productsType";
import { arrowDownMiniSVG } from "@/components/shared/icons/icons";

async function fetcher(url: string) {
	const res = await fetch(url);
	return await res.json();
}

export default function SubCategorySelector({ categorySlug }: { categorySlug: string }) {
	const [isExpanded, setIsExpanded] = useState(false);

	const { data } = useSWR(`/api/store/categories/getCategory?category=${categorySlug}`, fetcher);

	function controlBodyClick(e: MouseEvent) {
		const button = (e.target as HTMLElement).closest("#subcategory_selector");
		if (button) {
			setIsExpanded((prev) => !prev);
		} else {
			setIsExpanded(false);
		}
	}

	function controlEscapePress(e: KeyboardEvent) {
		if (e.code !== "Escape") return;
		setIsExpanded(false);
	}

	useEffect(() => {
		document.body.addEventListener("click", controlBodyClick);
		return () => document.body.removeEventListener("click", controlBodyClick);
	});

	useEffect(() => {
		document.body.addEventListener("keydown", controlEscapePress);
		return () => document.body.removeEventListener("keydown", controlEscapePress);
	});

	return (
		<div
			id="subcategory_selector"
			style={{
				boxShadow: isExpanded ? "var(--box-shadow-variant)" : "var(--box-shadow)",
			}}
			className={styles.selector}
		>
			{data && <p>{data[1]}</p>}
			<div
				style={{
					transform: isExpanded ? "rotate(180deg)" : undefined,
				}}
				className={styles.icon}
			>
				{arrowDownMiniSVG}
			</div>
			<ul
				style={{
					background: isExpanded ? "var(--background-color)" : "transparent",
					color: isExpanded ? "var(--foreground-color)" : "foreground",
					boxShadow: isExpanded ? undefined : "none",
					visibility: isExpanded ? "visible" : "hidden",
				}}
				className={styles.expandedList}
			>
				{data &&
					data[0]?.children?.map((childrenCategory: Category, index: number) => (
						<li key={index}>
							<Link className={styles.link} href={`/catalog/category/${childrenCategory.slug}`}>
								<p
									style={{
										color: isExpanded ? "var(--foreground-color)" : "foreground",
										visibility: isExpanded ? "visible" : "hidden",
									}}
								>
									{childrenCategory.name}
								</p>
							</Link>
						</li>
					))}
			</ul>
		</div>
	);
}
