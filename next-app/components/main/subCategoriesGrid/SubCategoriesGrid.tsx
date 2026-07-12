"use client";

import styles from "./SubCategoriesGrid.module.scss";
import Link from "next/link";
import Image from "next/image";
import { brandsCards } from "@/components/brandsData";

export default function SubcategoriesGrid() {
	return (
		<>
			<div className={styles.grid}>
				{brandsCards.map((brand, index) => (
					<Link
						href={`/${brand.slug}`}
						key={index}
						className={styles.grid_card}
					>
						<div className={styles.grid_card_content}>
							<div className={styles.text_content}>
								<h3>{brand.name}</h3>
							</div>
							<div className={styles.image_container}>
								<Image
									src={brand.image}
									alt={`${brand.name} logo`}
									width={120}
									height={80}
									className={styles.brand_image}
								/>
							</div>
						</div>
					</Link>
				))}
			</div>
		</>
	);
}
