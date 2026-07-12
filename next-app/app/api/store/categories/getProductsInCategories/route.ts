import readAllProductsFile from "../../products/utils/readAllProductsFile";
import readCategoriesThreeFile from "../utils/readCategoriesTreeFile";
import { getQueries } from "@/app/api/utils/readQueries";
import { Category } from "@/types/productsType";
import readBrandsTreeFile from "../utils/readBrandsTreeFile";

function flattenCategories(categories: Category[]): Category[] {
	const result: Category[] = [];

	function walk(nodes: Category[]) {
		for (const node of nodes) {
			result.push(node);

			if (node.children.length) {
				walk(node.children);
			}
		}
	}

	walk(categories);
	return result;
}

function collectChildren(
	ids: number[],
	categoryMap: Map<number, Category>,
): number[] {
	const result = new Set(ids);
	const queue = [...ids];

	while (queue.length) {
		const id = queue.shift()!;
		const category = categoryMap.get(id);

		if (!category) continue;

		for (const child of category.children) {
			if (!result.has(child.id)) {
				result.add(child.id);
				queue.push(child.id);
			}
		}
	}

	return [...result];
}

export async function GET(req: Request) {
	const query = getQueries(req.url);
	const { brand, categories, models, page, order, search } = query;

	const categoriesTree = await readCategoriesThreeFile();
	const brandsTree = await readBrandsTreeFile();
	const products = await readAllProductsFile();

	if (!categoriesTree) {
		throw new Error("Failed to read categories tree");
	}

	if (!brandsTree) {
		throw new Error("Failed to read brands tree");
	}

	if (!products) {
		throw new Error("Failed to read products");
	}

	const flatCategories = flattenCategories(categoriesTree);
	const flatBrands = flattenCategories(brandsTree);

	const slugMap = new Map<string, Category>();

	for (const category of [...flatCategories, ...flatBrands]) {
		slugMap.set(decodeURIComponent(category.slug), category);
	}

	let filteredProducts = [...products];

	/**
	 * BRAND
	 */

	if (brand) {
		const brandCategory = slugMap.get(decodeURIComponent(brand));

		if (brandCategory) {
			filteredProducts = filteredProducts.filter((product) =>
				product.categories.some(
					(category: Category) => category.id === brandCategory.id,
				),
			);
		}
	}

	/**
	 * MODELS
	 */

	if (models.length) {
		filteredProducts = filteredProducts.filter((product) => {
			const matched = models.some((model) =>
				product.categories.some(
					(cat: Category) =>
						decodeURIComponent(cat.slug).toLowerCase() ===
							model.toLowerCase() ||
						cat.name.toLowerCase() === model.toLowerCase(),
				),
			);

			return matched;
		});
	}

	/**
	 * PRODUCT CATEGORIES
	 */

	if (categories.length) {
		const categoryMap = new Map<number, Category>();

		for (const category of flatCategories) {
			categoryMap.set(category.id, category);
		}

		const selectedIds = categories
			.map((slug) => slugMap.get(decodeURIComponent(slug))?.id)
			.filter(Boolean) as number[];

		const allowedIds = collectChildren(selectedIds, categoryMap);

		filteredProducts = filteredProducts.filter((product) =>
			product.categories.some((category: Category) =>
				allowedIds.includes(category.id),
			),
		);
	}

	/**
	 * SEARCH
	 */

	if (search) {
		const request = search.toLowerCase();

		filteredProducts = filteredProducts.filter((product) =>
			product.name.toLowerCase().includes(request),
		);
	}

	/**
	 * SORT
	 */

	filteredProducts.sort((a, b) =>
		order === "decrease" ? +b.price - +a.price : +a.price - +b.price,
	);

	/**
	 * PAGINATION
	 */

	const pageSize = 12;
	const currentPage = Number(page || 1);

	const start = (currentPage - 1) * pageSize;
	const end = start + pageSize;

	return new Response(JSON.stringify(filteredProducts.slice(start, end)), {
		status: 200,
		headers: {
			"content-type": "application/json",
			"x-total-count": String(Math.ceil(filteredProducts.length / pageSize)),
		},
	});
}
