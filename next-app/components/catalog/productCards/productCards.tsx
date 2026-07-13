import { useContext } from "react";

import styles from "./productCards.module.scss";
import { ModalDescriptionContext } from "@/hooks/modalDescriptionProvider";
import {
	AddToCartButton,
	RemoveFromCartButton,
} from "../cartButtons/cartButtons";
import Counter from "./counter/counter";
import { Product, ProductInCart } from "@/types/productsType";
import Image from "next/image";

export function FeedProductCard({ product }: { product: Product }) {
	const setIsDescriptionVisible = useContext(
		ModalDescriptionContext,
	).setIsVisible;
	const setProductData = useContext(ModalDescriptionContext).setProductData;

	const { attributes, images, name, sku, regular_price, sale_price, status } =
		product;
	if (status !== "publish") return;
	if (!images[0]) return;

	function showModalDescription() {
		if (!setIsDescriptionVisible || !setProductData) return;
		setProductData(product);
		setIsDescriptionVisible(true);
	}

	return (
		<div
			itemScope
			itemType="http://schema.org/Product"
			className={styles.feedProductCard}
		>
			{sale_price && <div className={styles.saleBadge}>% Скидки</div>}
			<div className={styles.imageContainer}>
				<Image
					unoptimized
					src={images[0].src}
					alt={images[0].alt}
					width={300}
					height={240}
					layout="responsive"
					loading="lazy"
					itemProp="image"
				/>
			</div>
			<h3 itemProp="name">{name}</h3>
			<p className={styles.sku}>Арт. : {sku}</p>
			{attributes[0]?.name ?
				<p className={styles.brand}>
					{attributes[0]?.name}: {attributes[0]?.options}
				</p>
			:	<p className={styles.brand}>Производитель не указан</p>}
			<div
				itemProp="offers"
				itemScope
				itemType="http://schema.org/Offer"
				className={styles.priceBlock}
			>
				{sale_price ?
					<>
						<p className={styles.sale}>{sale_price}</p>
						<p className={styles.regular}>
							<span itemProp="price">{regular_price}</span> руб.
						</p>
					</>
				:	<p itemProp="priceCurrency">{regular_price} руб.</p>}
			</div>
			<div className={styles.buttonsCont}>
				<button onClick={showModalDescription}>подробнее</button>
				<AddToCartButton productData={product} />
			</div>
		</div>
	);
}

export function CartProductCard({ product }: { product: ProductInCart }) {
	return (
		<div className={styles.cartCard}>
			<div className={styles.imageContainer}>
				<Image
					unoptimized
					src={product.images[0]?.src}
					alt={product.images[0]?.alt}
					width={150}
					height={150}
					layout="responsive"
					loading="lazy"
				/>
			</div>
			<h3 className={styles.name}>{product.name}</h3>
			<Counter product={product} />
			<p className={styles.price}>
				{product.quantity * +product.price + " руб."}
			</p>

			<RemoveFromCartButton productData={product} />
		</div>
	);
}

export function ProductCardSkeleton() {
	return (
		<div className={styles.skeletonProductCard}>
			<div className={styles.skeletonImage} />
			<div className={styles.skeletonTitle} />
			<div className={styles.skeletonDescription} />
			<div className={styles.skeletonButtons} />
		</div>
	);
}
