import readAllProductsFile from "../../products/utils/readAllProductsFile";
import readCategoriesThreeFile from "../utils/readCategoriesTreeFile";
import { getQueries } from "@/app/api/utils/readQueries";
import { Category, Product } from "@/types/productsType";

function flattenCategories(categories: Category[]): Category[] {
	const result: Category[] = [];

	function traverse(cats: Category[]) {
		for (const cat of cats) {
			result.push(cat);
			if (cat.children && cat.children.length > 0) {
				traverse(cat.children);
			}
		}
	}

	traverse(categories);
	return result;
}

function findAllChildrenCategories(
	categoriesIds: number[],
	categoryMap: Map<number, Category>,
): number[] {
	const result = new Set<number>(categoriesIds);
	const queue = [...categoriesIds];

	while (queue.length > 0) {
		const id = queue.shift()!;
		const category = categoryMap.get(id);

		if (category?.children) {
			for (const child of category.children) {
				if (!result.has(child.id)) {
					result.add(child.id);
					queue.push(child.id);
				}
			}
		}
	}

	return Array.from(result);
}

function isCarCategory(
	categoryId: number,
	categoryMap: Map<number, Category>,
): boolean {
	let current = categoryMap.get(categoryId);

	while (current && current.parent !== 0) {
		current = categoryMap.get(current.parent);
	}

	const result = current?.name === "Автомобили";

	return result;
}

export async function GET(req: Request) {
	const queries = getQueries(req.url);
	const { slugs, page, order } = queries;

	const categoriesThree = await readCategoriesThreeFile();
	const allProducts = (await readAllProductsFile())?.sort((a: any, b: any) =>
		order === "increase" ? +a.price - +b.price : +b.price - +a.price,
	);

	if (!allProducts)
		throw new Error("Endpoint: Failed to read AllProducts.json");
	if (!categoriesThree)
		throw new Error("Endpoint: Failed to read categoriesThree");

	const allCategoriesFlat = flattenCategories(categoriesThree);
	const categoryMap = new Map<number, Category>();
	allCategoriesFlat.forEach((cat) => categoryMap.set(cat.id, cat));

	const categoriesIds = allCategoriesFlat
		.filter((c) => slugs.includes(decodeURIComponent(c.slug)))
		.map((c) => c.id);

	const expandedCategories = findAllChildrenCategories(
		categoriesIds,
		categoryMap,
	);

	const carCategories: number[] = [];
	const productCategories: number[] = [];

	for (const id of expandedCategories) {
		if (isCarCategory(id, categoryMap)) {
			carCategories.push(id);
		} else {
			productCategories.push(id);
		}
	}

	const data: Product[] = [];

	for (const product of allProducts) {
		const productCategoryIds = product.categories.map(
			(category: Category) => category.id,
		);

		let carMatch = true;
		if (carCategories.length > 0) {
			carMatch = productCategoryIds.some((id: number) =>
				carCategories.includes(id),
			);
		}

		let productMatch = true;
		if (productCategories.length > 0) {
			productMatch = productCategoryIds.some((id: number) =>
				productCategories.includes(id),
			);
		}

		if (carMatch && productMatch) {
			data.push(product);
		}
	}

	return new Response(JSON.stringify(data.slice(+page * 12 - 12, +page * 12)), {
		headers: {
			"content-type": "application/json",
			"x-total-count": `${Math.ceil(data.length / 12)}`,
		},
		status: 200,
	});
}
