"use client";

import styles from "./SubCategoriesGrid.module.scss";
import Link from "next/link";
import Image from "next/image";
import { LinkButton } from "@/components/shared/ctaButtons/ctaButtons";

export default function SubcategoriesGrid() {
	const cardLinks = [
		{
			categoryId: "34",
			name: "Tank",
			image: "/brandLogos/tank.png",
		},
		{
			categoryId: "29",
			name: "JAC",
			image: "/brandLogos/jac.png",
		},
		{
			categoryId: "40",
			name: "Huanghai",
			image: "/brandLogos/huanghai.png",
		},
		{
			categoryId: "19",
			name: "Dongfeng",
			image: "/brandLogos/dongfeng.png",
		},
		{
			categoryId: "20",
			name: "Foton",
			image: "/brandLogos/foton.png",
		},
		{
			categoryId: "18",
			name: "Changan",
			image: "/brandLogos/changan.png",
		},
		{
			categoryId: "17",
			name: "Baic",
			image: "/brandLogos/baic.png",
		},
		{
			categoryId: "21",
			name: "Great Wall",
			image: "/brandLogos/gwm.png",
		},
		{
			categoryId: "33",
			name: "Sollers",
			image: "/brandLogos/sollers.png",
		},
		{
			categoryId: "39",
			name: "JMC",
			image: "/brandLogos/jmc.png",
		},
	];

	return (
		<>
			<div className={styles.grid}>
				{cardLinks.map((link, index) => (
					<Link
						href={`/catalog/category/?id=${link.categoryId}`}
						key={index}
						className={styles.grid_card}
					>
						<div className={styles.grid_card_content}>
							<div className={styles.text_content}>
								<h3>{link.name}</h3>
							</div>
							<div className={styles.image_container}>
								<Image
									src={link.image}
									alt={`${link.name} logo`}
									width={120}
									height={80}
									className={styles.brand_image}
								/>
							</div>
						</div>
					</Link>
				))}

				{/* Карточка "Каталог" */}
				<div className={styles.grid_card}>
					<div className={styles.grid_card_content}>
						<div className={styles.catalog_content}>
							<h3>Больше товаров в каталоге</h3>
							<LinkButton text="Каталог" link="/catalog" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
