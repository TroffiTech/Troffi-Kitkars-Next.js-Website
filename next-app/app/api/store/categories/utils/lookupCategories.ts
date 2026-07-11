import type { Category } from "@/types/productsType";
import readBrandsTreeFile from "./readBrandsTreeFile";
import readCategoriesTreeFile from "./readCategoriesTreeFile";

export async function findBrand(slug: string) {
	const BrandsTree: Category[] = await readBrandsTreeFile();
	return BrandsTree.find((brand) => brand.slug === slug);
}

export async function findModel(brandSlug: string, modelSlug: string) {
	const brand = await findBrand(brandSlug);
	return brand?.children?.find((model) => model.slug === modelSlug);
}

export async function findCategory(slug: string): Promise<Category | null> {
	const CategoriesTree: Category[] = await readCategoriesTreeFile();

	const search = (items: Category[]): Category | null => {
		for (const item of items) {
			if (item.slug === slug) {
				return item;
			}

			if (item.children?.length) {
				const found = search(item.children);

				if (found) {
					return found;
				}
			}
		}

		return null;
	};

	return search(CategoriesTree as Category[]);
}
