import flattenCategories from "@/app/api/store/categories/utils/flattenCategories";
import readBrandsTreeFile from "@/app/api/store/categories/utils/readBrandsTreeFile";
import readCategoriesTreeFile from "@/app/api/store/categories/utils/readCategoriesTreeFile";
import { RouteInfo } from "@/types/seo/seoTypes";

export async function resolveRoute(pathname: string): Promise<RouteInfo> {
	const brands = flattenCategories(await readBrandsTreeFile());
	const categories = flattenCategories(await readCategoriesTreeFile());

	const brandMap = new Map(brands.map((c) => [c.slug, c]));
	const categoryMap = new Map(categories.map((c) => [c.slug, c]));

	const segments = pathname.split("/").filter(Boolean);

	const result: RouteInfo = {
		categories: [],
	};

	if (brandMap.has(segments[0])) {
		result.brand = brandMap.get(segments[0]);

		for (const slug of segments.slice(1)) {
			const category = categoryMap.get(slug);
			if (category) result.categories.push(category);
		}
	} else {
		for (const slug of segments) {
			const category = categoryMap.get(slug);
			if (category) result.categories.push(category);
		}
	}

	return result;
}
