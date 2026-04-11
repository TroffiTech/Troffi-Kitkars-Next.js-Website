import styles from "./staticDescription.module.scss";
import SideSlideWidget from "../shared/sideSlideWidget/sideSlideWidget";
import { Product } from "@/types/productsType";
import ReduxStoreProvider from "@/hooks/reduxStoreProvider";
import SmallPopupProvider from "@/hooks/smallPopupsProvider";
import ImageCarousel from "../shared/imageCarousel/imageCarusel";
import { AddToCartButton } from "../catalog/cartButtons/cartButtons";

export default function StaticDescription({ productData }: { productData: Product }) {
	function generateDescription(hmtlText: string) {
		const description = { __html: hmtlText };
		return <div dangerouslySetInnerHTML={description} />;
	}

	return (
		<div className={styles.modal}>
			<div className={styles.innerContent}>
				<div className={styles.upperInner}>
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
								<p className={styles.sale}>{productData.sale_price}</p>
								<p className={styles.regular}>
									<span itemProp="price">{productData.regular_price}</span> руб.
								</p>
							</>
						) : (
							<p itemProp="price">{productData.regular_price} руб.</p>
						)}
					</div>

					<div className={styles.addToCartButton}>
						<ReduxStoreProvider>
							<SmallPopupProvider>
								<AddToCartButton productData={productData} />
								<SideSlideWidget />
							</SmallPopupProvider>
						</ReduxStoreProvider>
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
