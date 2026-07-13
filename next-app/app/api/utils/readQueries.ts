export type ProductQueries = {
	page: number;
	order: "increase" | "decrease";
	brand: string;
	categories: string[];
	models: string[];
	search: string;
	sku: string;
};

export function getQueries(url: string): ProductQueries {
	const params = new URL(url).searchParams;

	return {
		page: Number(params.get("page") ?? 1),

		order: (params.get("order") as "increase" | "decrease") ?? "increase",

		brand: params.get("brand") ?? "",

		categories: params.get("categories")?.split(",").filter(Boolean) ?? [],

		models: params.get("models")?.split(",").filter(Boolean) ?? [],

		search: params.get("search") ?? "",

		sku: params.get("sku") ?? "",
	};
}
