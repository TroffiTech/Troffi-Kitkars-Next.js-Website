"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import CarModelsFilter from "./CarModelsFilter";
import CategoryFilter from "./CategoryNavigator";

import styles from "./filters.module.scss";

type FiltersState = {
	models: string[];
	categories: string[];
};

export default function FeedFilters() {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const brand = useMemo(
		() => pathname.split("/").filter(Boolean)[0] ?? "",
		[pathname],
	);

	const pathCategories = useMemo(
		() => pathname.split("/").filter(Boolean).slice(1),
		[pathname],
	);

	const [filters, setFilters] = useState<FiltersState>({
		models: [],
		categories: [],
	});

	useEffect(() => {
		setFilters({
			models:
				searchParams
					?.get("model")
					?.split(",")
					.map((slug) => slug.trim())
					.filter(Boolean) ?? [],

			// Later we'll initialize these from the URL/path.
			categories: [],
		});
	}, [searchParams]);

	const handleModelsChange = useCallback((models: string[]) => {
		setFilters((prev) => ({
			...prev,
			models,
		}));
	}, []);

	const handleCategoriesChange = useCallback((categories: string[]) => {
		setFilters((prev) => ({
			...prev,
			categories,
		}));
	}, []);

	const applyFilters = useCallback(() => {
		const params = new URLSearchParams(searchParams?.toString());

		if (filters.models.length) {
			params.set("model", filters.models.join(","));
		} else {
			params.delete("model");
		}

		// Build the new pathname from the selected category tree.
		// We'll improve this in the next step.
		const nextPath =
			filters.categories.length > 0 ?
				`/${brand}/${filters.categories.join("/")}`
			:	`/${brand}`;

		router.push(`${nextPath}${params.toString() ? `?${params}` : ""}`, {
			scroll: false,
		});
	}, [brand, filters, router, searchParams]);

	const clearFilters = useCallback(() => {
		setFilters({
			models: [],
			categories: [],
		});

		router.push(`/${brand}`, {
			scroll: false,
		});
	}, [brand, router]);

	return (
		<div className={styles.filters}>
			<CarModelsFilter
				brand={brand}
				selectedModels={filters.models}
				onChange={handleModelsChange}
			/>

			<CategoryFilter
				selectedCategories={filters.categories}
				onSelectionChange={handleCategoriesChange}
			/>

			<button className={styles.submitBtn} onClick={applyFilters}>
				Применить фильтры
			</button>

			<button className={styles.clearBtn} onClick={clearFilters}>
				Сбросить
			</button>
		</div>
	);
}
