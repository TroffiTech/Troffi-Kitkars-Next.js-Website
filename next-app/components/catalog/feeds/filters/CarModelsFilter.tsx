"use client";

import useSWR from "swr";

import type { Category } from "@/types/productsType";

import { fetcher } from "./helpers/fetcher";
import styles from "./CarModelsFilter.module.scss";

type CarModelsFilterProps = {
	brand: string;
	selectedModels: string[];
	onChange: (selectedModels: string[]) => void;
};

export default function CarModelsFilter({
	brand,
	selectedModels,
	onChange,
}: CarModelsFilterProps) {
	const {
		data = [],
		isLoading,
		error,
	} = useSWR<Category[]>(
		brand ? `/api/store/categories/getModels?brand=${brand}` : null,
		fetcher,
	);

	console.log(data, brand);

	const handleToggle = (slug: string) => {
		const nextSelection = new Set(selectedModels);

		if (nextSelection.has(slug)) {
			nextSelection.delete(slug);
		} else {
			nextSelection.add(slug);
		}

		onChange([...nextSelection]);
	};

	if (!brand) {
		return null;
	}

	if (error) {
		return (
			<div className={styles.carModelsFilter}>
				<h3>Выберите модель</h3>
				<p>Не удалось загрузить модели</p>
			</div>
		);
	}

	return (
		<div className={styles.carModelsFilter}>
			<h3>Выберите модель</h3>

			<ul className={styles.carModelsList}>
				{isLoading ?
					Array.from({ length: 6 }).map((_, index) => (
						<li key={index} className={styles.carModelItem}>
							Загрузка...
						</li>
					))
				:	data.map((model) => {
						const isSelected = selectedModels.includes(model.slug);

						return (
							<li key={model.id}>
								<button
									type="button"
									onClick={() => handleToggle(model.slug)}
									className={`${styles.carModelButton} ${
										isSelected ? styles.active : ""
									}`}
								>
									{model.name}
								</button>
							</li>
						);
					})
				}
			</ul>
		</div>
	);
}
