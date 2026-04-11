export type ImageType = {
	id: number;
	alt: string;
	name: string;
	src: string;
};

export type Product = {
	attributes: {
		name: string;
		options: string[];
	}[];
	categories: Category[];
	description: string;
	id: number;
	images: ImageType[];
	name: string;
	on_sale: boolean;
	price: string;
	regular_price: string;
	sale_price: string;
	sku: string;
	status: "draft" | "publish";
	stock_quantity: null | number;
	slug?: string;
};

export interface ProductInCart extends Product {
	quantity: number;
}

export type Category = {
	name: string;
	slug: string;
	id: number;
	parent: number;
	count: number;
	children: Category[];
};

export type CategoriesThree = Array<Category>;
