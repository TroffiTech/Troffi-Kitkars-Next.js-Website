"use client";

import { arrowDownMiniSVG } from "@/components/shared/icons/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/types/productsType";
import { useState, useEffect } from "react";
import styles from "./filters.module.scss";
import useSWR from "swr";

async function fetcher(url: string) {
	const res = await fetch(url);
	return await res.json();
}

export default function Filters() {
	const { data, isLoading } = useSWR("/api/store/categories/getCategoriesFile", fetcher);
	const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
	const router = useRouter();
	const searchParams = useSearchParams();

	function getAllChildrenIds(categoryId: number, categories: Category[]): number[] {
		const result: number[] = [];
		const category = categories.find((c) => c.id === categoryId);
		if (!category?.children) return result;

		for (const child of category.children) {
			result.push(child.id);
			result.push(...getAllChildrenIds(child.id, categories));
		}
		return result;
	}

	function getParentId(categoryId: number, categories: Category[]): number | null {
		for (const cat of categories) {
			if (cat.children?.some((child) => child.id === categoryId)) return cat.id;
			for (const child of cat.children || []) {
				const parent = getParentId(categoryId, [child]);
				if (parent) return parent;
			}
		}
		return null;
	}

	useEffect(() => {
		const categoryParam = searchParams?.get("id");
		if (categoryParam) {
			const categoryIds = categoryParam
				.split(",")
				.map((id) => parseInt(id.trim()))
				.filter((id) => !isNaN(id));

			if (categoryIds.length > 0) {
				setSelectedCategories(categoryIds);
			}
		}
	}, [searchParams]);

	const handleCategoryToggle = (categoryId: number) => {
		setSelectedCategories((prev) => {
			let newSelection = [...prev];
			const isSelected = prev.includes(categoryId);
			const childrenIds = getAllChildrenIds(categoryId, data || []);

			if (isSelected) {
				newSelection = newSelection.filter((id) => id !== categoryId && !childrenIds.includes(id));
			} else {
				newSelection.push(categoryId, ...childrenIds);
			}

			const allCategories = data || [];
			for (const id of [...newSelection]) {
				const parentId = getParentId(id, allCategories);
				if (parentId) {
					const siblingsIds = getAllChildrenIds(parentId, allCategories);
					const allSiblingsSelected = siblingsIds.every((sid) => newSelection.includes(sid));
					if (!allSiblingsSelected && newSelection.includes(parentId)) {
						newSelection = newSelection.filter((i) => i !== parentId);
					}
					if (allSiblingsSelected && !newSelection.includes(parentId)) {
						newSelection.push(parentId);
					}
				}
			}

			return [...new Set(newSelection)];
		});
	};

	const handleClearFilters = () => {
		setSelectedCategories([]);
		router.push("/catalog/");
	};

	const handleApplyFilters = () => {
		const categoriesParam = selectedCategories.join(",");
		if (categoriesParam === "") router.push("/catalog/");
		else router.push(`/catalog/category?id=${categoriesParam}`);
	};

	if (isLoading) {
		return (
			<div className={styles.filters}>
				<div className={styles.header}>
					<h3>Категории</h3>
				</div>
				<ul className={styles.categoriesList}>
					{[1, 2, 3, 4, 5].map((i) => (
						<li className={styles.categoryItem} key={i}>
							<div className={styles.title}>
								<div className={styles.categoryInfo}>
									<span className={styles.categoryName}>Загрузка...</span>
								</div>
							</div>
						</li>
					))}
				</ul>
				<button className={styles.submitBtn} onClick={handleApplyFilters}>
					Применить фильтры
				</button>
			</div>
		);
	}

	if (!data || !Array.isArray(data)) {
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
				<button
					className={styles.clearBtn}
					onClick={handleClearFilters}
					disabled={selectedCategories.length === 0}
				>
					Сбросить
				</button>
			</div>

			<ul className={styles.categoriesList}>
				{data.map((category: Category) => (
					<CategoryItem
						key={category.id}
						category={category}
						level={0}
						selectedCategories={selectedCategories}
						onCategoryToggle={handleCategoryToggle}
					/>
				))}
			</ul>

			<button className={styles.submitBtn} onClick={handleApplyFilters}>
				Применить фильтры
				{selectedCategories.length > 0 && ` (${selectedCategories.length})`}
			</button>
		</div>
	);
}

function CategoryItem({
	category,
	level,
	selectedCategories,
	onCategoryToggle,
}: {
	category: Category;
	level: number;
	selectedCategories: number[];
	onCategoryToggle: (id: number) => void;
}) {
	const [isExpanded, setIsExpanded] = useState(level < 0);
	const hasChildren = category.children && category.children.length > 0;
	const isSelected = selectedCategories.includes(category.id);

	const handleTitleClick = () => {
		if (hasChildren) {
			setIsExpanded(!isExpanded);
		}
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation();
		onCategoryToggle(category.id);
	};

	const handleArrowClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsExpanded(!isExpanded);
	};

	return (
		<li className={`${styles.categoryItem} ${isSelected ? styles.selected : ""}`}>
			<div
				className={styles.title}
				style={{ paddingLeft: `${level * 2 + 8}px` }}
				onClick={handleTitleClick}
			>
				<div className={styles.categoryInfo}>
					<input
						type="checkbox"
						className={styles.checkbox}
						id={`category-${category.id}`}
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
						className={`${styles.arrow} ${isExpanded ? styles.expanded : ""}`}
						onClick={handleArrowClick}
						type="button"
						aria-label={isExpanded ? "Свернуть" : "Развернуть"}
					>
						{arrowDownMiniSVG}
					</button>
				)}
			</div>

			{hasChildren && (
				<div className={`${styles.childrenContainer} ${isExpanded ? styles.expanded : ""}`}>
					<ul className={styles.children}>
						{category.children.map((child) => (
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
