import { CategoriesThree } from "@/types/productsType";

export default function findRelatedCategoriesIdBySlug(
	categoriesThree: CategoriesThree,
	slug: string
) {
	const relatedCategories: number[] = [];

	categoriesThree.map((category) => {
		if (category.slug === slug) {
			relatedCategories.push(category.id);
			category.children?.map((childrenCategory) => {
				relatedCategories.push(childrenCategory.id);
			});
		} else {
			category.children?.map((childrenCategory) => {
				if (childrenCategory.slug === slug) relatedCategories.push(childrenCategory.id);
			});
		}
	});
	return relatedCategories;
}
