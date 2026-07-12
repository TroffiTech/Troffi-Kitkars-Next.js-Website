import readAllProductsFile from "@/app/api/store/products/utils/readAllProductsFile";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";

import StaticDescription from "@/components/staticDescription/staticDescription";
import { Product } from "@/types/productsType";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	const products = await readAllProductsFile();

	return products.map((product: Product) => ({
		slug: product.sku,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	const products: Product[] = await readAllProductsFile();
	const product = products.find(
		(item: Product) =>
			decodeURIComponent(item.sku) === decodeURIComponent(slug),
	);
	if (!product) {
		return {
			title: "Товар не найден | KITKARS.RU",
		};
	}
	return {
		title: `${product.name} купить | KITKARS.RU`,
		description: `Купить ${product.name}. Артикул ${product.sku}. Быстрая доставка по России.`,
		openGraph: {
			title: product.name,
			description: product.description,
			images: [product.images[0]],
		},
		alternates: {
			canonical: `/products/${product.sku}`,
		},
	};
}

export default async function ProductPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const allProducts = await readAllProductsFile();
	if (!allProducts)
		throw new Error("Endpoint: Failed to read allProducts.json");
	const productData = allProducts.filter(
		(item: any) => decodeURIComponent(item.sku!) === decodeURIComponent(slug),
	)[0];

	if (!productData) {
		notFound();
	}

	return (
		<main>
			<section className="flex-box__column">
				<Header />
				<StaticDescription productData={productData} />
				<Footer />
			</section>
		</main>
	);
}
