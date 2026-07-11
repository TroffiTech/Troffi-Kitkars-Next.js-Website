"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import CarModelsFilter from "./CarModelsFilter";
import CategoryFilter from "./CategoryNavigator";

import styles from "./filters.module.scss";
import { buildRoute, parseRoute } from "@/lib/routeParser";

export default function FeedFilters() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const parsedRoute = parseRoute(
		pathname,
		new URLSearchParams(searchParams.toString()),
	);

	const brand = parsedRoute.brand || "";
	const categories = parsedRoute.categories || [];
	const models = parsedRoute.models || [];

	const handleModelsChange = useCallback(
		(models: string[]) => {
			router.push(
				buildRoute({
					...parsedRoute,
					models,
				}),
				{ scroll: false },
			);
		},
		[parsedRoute, router],
	);

	const handleCategoriesChange = useCallback(
		(categories: string[]) => {
			router.push(
				buildRoute({
					...parsedRoute,
					categories,
				}),
				{ scroll: false },
			);
		},
		[parsedRoute, router],
	);

	const clearFilters = useCallback(() => {
		router.push(
			buildRoute({
				brand,
				categories: [],
				models: [],
			}),
			{ scroll: false },
		);
	}, [brand, router]);

	return (
		<div className={styles.filters}>
			<CarModelsFilter
				brand={brand}
				selectedModels={models}
				onChange={handleModelsChange}
			/>

			<CategoryFilter
				selectedCategories={categories}
				onSelectionChange={handleCategoriesChange}
			/>
			{/* 
			<button className={styles.submitBtn} onClick={applyFilters}>
				Применить фильтры
			</button> */}

			<button className={styles.clearBtn} onClick={clearFilters}>
				Сбросить
			</button>
		</div>
	);
}
