import { Category } from "../productsType";

export type SeoContext = {
	brand?: {
		slug: string;
		name: string;
	};
	categories: {
		slug: string;
		name: string;
	}[];
	models: {
		slug: string;
		name: string;
	}[];
	search: string | undefined;
	order: "increase" | "decrease";
	isCatalog: boolean;
};

export type RouteInfo = {
	brand?: Category;
	categories: Category[];
};
