import { CategoriesTree } from "@/types/productsType";

export default function findRelatedCategoriesIdBySlug(
	CategoriesTree: CategoriesTree,
	slug: string,
) {
	const relatedCategories: number[] = [];

	CategoriesTree.map((category) => {
		if (category.slug === slug) {
			relatedCategories.push(category.id);
			category.children?.map((childrenCategory) => {
				relatedCategories.push(childrenCategory.id);
			});
		} else {
			category.children?.map((childrenCategory) => {
				if (childrenCategory.slug === slug)
					relatedCategories.push(childrenCategory.id);
			});
		}
	});
	return relatedCategories;
}
