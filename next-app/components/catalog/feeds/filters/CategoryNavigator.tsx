"use client";

import { useCallback, useMemo } from "react";
import useSWR from "swr";

import type { Category } from "@/types/productsType";

import CategoryItem from "./CategoryItem";
import { buildCategoryMaps } from "./helpers/categoryMaps";
import { toggleCategorySelection } from "./helpers/categorySelection";

import styles from "./Filters.module.scss";
import { fetcher } from "./helpers/fetcher";

type CategoryFilterProps = {
	selectedCategories: string[];
	onSelectionChange: (selection: string[]) => void;
};

export default function CategoryFilter({
	selectedCategories,
	onSelectionChange,
}: CategoryFilterProps) {
	const {
		data = [],
		isLoading,
		error,
	} = useSWR<Category[]>(
		"/api/store/categories/getProductsCategories",
		fetcher,
	);

	const categoryMaps = useMemo(() => buildCategoryMaps(data), [data]);

	const selectedCategorySet = useMemo(
		() => new Set(selectedCategories),
		[selectedCategories],
	);

	const handleCategoryToggle = useCallback(
		(categorySlug: string) => {
			onSelectionChange(
				toggleCategorySelection(selectedCategories, categorySlug, categoryMaps),
			);
		},
		[selectedCategories, categoryMaps, onSelectionChange],
	);

	if (isLoading) {
		return (
			<div className={styles.filters}>
				<div className={styles.header}>
					<h3>Категории</h3>
				</div>

				<ul className={styles.categoriesList}>
					{Array.from({ length: 5 }).map((_, index) => (
						<li key={index} className={styles.categoryItem}>
							<div className={styles.title}>
								<div className={styles.categoryInfo}>
									<span className={styles.categoryName}>Загрузка...</span>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		);
	}

	if (error) {
		return (
			<div className={styles.filters}>
				<div className={styles.header}>
					<h3>Категории</h3>
				</div>

				<div className={styles.error}>Не удалось загрузить категории</div>
			</div>
		);
	}

	return (
		<div className={styles.filters}>
			<div className={styles.header}>
				<h3>Категории</h3>
			</div>

			<ul className={styles.categoriesList}>
				{data.map((category) => (
					<CategoryItem
						key={category.id}
						category={category}
						level={0}
						selectedCategories={selectedCategorySet}
						onCategoryToggle={handleCategoryToggle}
					/>
				))}
			</ul>
		</div>
	);
}
