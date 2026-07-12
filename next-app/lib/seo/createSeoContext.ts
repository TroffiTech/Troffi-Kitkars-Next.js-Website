import flattenCategories from "@/app/api/store/categories/utils/flattenCategories";
import readBrandsTreeFile from "@/app/api/store/categories/utils/readBrandsTreeFile";
import readCategoriesTreeFile from "@/app/api/store/categories/utils/readCategoriesTreeFile";
import { parseRoute } from "../routeParser";

export async function createSeoContext(
	pathname: string,
	searchParams: URLSearchParams,
) {
	const route = parseRoute(pathname, searchParams);

	const brands = flattenCategories(await readBrandsTreeFile());
	const categories = flattenCategories(await readCategoriesTreeFile());

	const brand = brands.find((item) => item.slug === route.brand);

	return {
		brand:
			brand && route.brand ?
				{
					slug: brand.slug,
					name: brand.name,
				}
			:	undefined,

		categories: route.categories
			.map((slug) => categories.find((c) => c.slug === slug))
			.filter(Boolean)
			.map((category) => ({
				slug: category!.slug,
				name: category!.name,
			})),

		models:
			brand ?
				route.models
					.map((slug) => brand.children.find((child) => child.slug === slug))
					.filter(Boolean)
					.map((model) => ({
						slug: model!.slug,
						name: model!.name,
					}))
			:	[],

		search: route.search,
		order: route.order,
		isCatalog: !route.brand,
	};
}
