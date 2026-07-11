"use client";

import { type ChangeEvent, type MouseEvent, useState } from "react";

import { Category } from "@/types/productsType";
import { arrowDownMiniSVG } from "@/components/shared/icons/icons";

import styles from "./filters.module.scss";

type CategoryItemProps = {
	category: Category;
	level: number;
	selectedCategories: Set<string>;
	onCategoryToggle: (slug: string) => void;
};

export default function CategoryItem({
	category,
	level,
	selectedCategories,
	onCategoryToggle,
}: CategoryItemProps) {
	const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);
	const hasSelectedDescendant = (category: Category): boolean => {
		return (
			category.children?.some(
				(child) =>
					selectedCategories.has(child.slug) || hasSelectedDescendant(child),
			) ?? false
		);
	};

	const isExpanded = isManuallyExpanded || hasSelectedDescendant(category);

	const hasChildren = (category.children?.length ?? 0) > 0;
	const isSelected = selectedCategories.has(category.slug);

	const handleTitleClick = () => {
		if (!hasChildren) return;

		setIsManuallyExpanded((prev) => !prev);
	};

	const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation();
		onCategoryToggle(category.slug);
	};

	const handleArrowClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setIsManuallyExpanded((prev) => !prev);
	};

	return (
		<li
			className={`${styles.categoryItem} ${isSelected ? styles.selected : ""}`}
		>
			<div
				className={styles.title}
				style={{
					paddingLeft: `${level * 2 + 8}px`,
				}}
				onClick={handleTitleClick}
			>
				<div className={styles.categoryInfo}>
					<input
						id={`category-${category.id}`}
						type="checkbox"
						className={styles.checkbox}
						checked={isSelected}
						onChange={handleCheckboxChange}
						onClick={(e) => e.stopPropagation()}
					/>

					<label
						htmlFor={`category-${category.id}`}
						className={styles.categoryName}
						onClick={(e) => e.stopPropagation()}
					>
						{category.name}
					</label>
				</div>

				{hasChildren && (
					<button
						type="button"
						className={`${styles.arrow} ${isExpanded ? styles.expanded : ""}`}
						onClick={handleArrowClick}
						aria-label={isExpanded ? "Свернуть" : "Развернуть"}
					>
						{arrowDownMiniSVG}
					</button>
				)}
			</div>

			{hasChildren && (
				<div
					className={`${styles.childrenContainer} ${
						isExpanded ? styles.expanded : ""
					}`}
				>
					<ul className={styles.children}>
						{category.children!.map((child) => (
							<CategoryItem
								key={child.id}
								category={child}
								level={level + 1}
								selectedCategories={selectedCategories}
								onCategoryToggle={onCategoryToggle}
							/>
						))}
					</ul>
				</div>
			)}
		</li>
	);
}
