"use client";

import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./modalDescription.module.scss";
import { ModalDescriptionContext } from "@/hooks/modalDescriptionProvider";
import { AddToCartButton } from "../cartButtons/cartButtons";
import { arrowRightSVG } from "@/components/shared/icons/icons";
import ImageCarousel from "@/components/shared/imageCarousel/imageCarusel";

function ModalDescriptionContent() {
	const isVisible = useContext(ModalDescriptionContext).isVisible;
	const setIsVisible = useContext(ModalDescriptionContext)?.setIsVisible;
	const productData = useContext(ModalDescriptionContext)?.productData;
	const [shouldRender, setShouldRender] = useState(false);

	function generateDescription(htmlText: string) {
		const description = { __html: htmlText };
		return <div dangerouslySetInnerHTML={description} />;
	}

	useEffect(() => {
		if (isVisible) {
			setShouldRender(true);
			document.body.classList.add("blockScroll");
		} else {
			document.body.classList.remove("blockScroll");
			// Задержка перед скрытием для завершения анимации
			const timer = setTimeout(() => {
				setShouldRender(false);
			}, 400);
			return () => clearTimeout(timer);
		}
	}, [isVisible]);

	if (!shouldRender && !isVisible) return null;
	if (!productData) return null;

	const modalClass = `${styles.modal} ${isVisible ? styles.modalEnter : styles.modalExit}`;
	const contentClass = `${styles.innerContent} ${
		isVisible ? styles.contentEnter : styles.contentExit
	}`;

	return (
		<div className={modalClass}>
			<div className={contentClass}>
				<button
					className={styles.closeButton}
					onClick={setIsVisible ? () => setIsVisible(false) : () => {}}
					aria-label="Закрыть"
				>
					{arrowRightSVG}
				</button>

				<div className={styles.upperInner}>
					<a
						href={`${process.env.NEXT_PUBLIC_DOMEN}/catalog/product/${decodeURIComponent(
							productData.sku!
						)}`}
						className={styles.productLink}
						target="_blank"
						rel="noopener noreferrer"
					>
						{`${process.env.NEXT_PUBLIC_DOMEN}/catalog/product/${decodeURIComponent(
							productData.sku!
						)}`}
					</a>
					<ImageCarousel images={productData.images} />
				</div>

				<div itemScope itemType="http://schema.org/Product" className={styles.lowerInner}>
					<div className={styles.categoriesString}>
						{productData.categories.map((category) => (
							<p key={category.id}>&gt;{category.name + " "}</p>
						))}
					</div>

					<h2 itemProp="name">{productData.name}</h2>
					<p className={styles.sku}>Арт. : {productData.sku}</p>

					<div
						itemProp="offers"
						itemScope
						itemType="http://schema.org/Offer"
						className={styles.priceBlock}
					>
						{productData.sale_price ? (
							<>
								<p className={styles.sale}>{productData.sale_price} руб.</p>
								<p className={styles.regular}>
									<span itemProp="price">{productData.regular_price}</span> руб.
								</p>
							</>
						) : (
							<p itemProp="price">{productData.regular_price} руб.</p>
						)}
					</div>

					<div className={styles.addToCartButton}>
						<AddToCartButton productData={productData} />
					</div>

					<h3>О товаре</h3>
					<div itemProp="description" className={styles.generatedDescription}>
						{generateDescription(productData.description)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default function ModalDescription() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	if (!mounted) return null;

	return createPortal(<ModalDescriptionContent />, document.body);
}
