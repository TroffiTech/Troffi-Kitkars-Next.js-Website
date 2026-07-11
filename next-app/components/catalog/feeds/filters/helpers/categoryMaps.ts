import { Category } from "@/types/productsType";

export type CategoryMaps = {
	descendantsBySlug: Map<string, string[]>;
	parentBySlug: Map<string, string | null>;
};

export function buildCategoryMaps(categories: Category[]): CategoryMaps {
	const parentBySlug = new Map<string, string | null>();
	const descendantsBySlug = new Map<string, string[]>();

	const collectDescendants = (category: Category): string[] => {
		const descendants = (category.children ?? []).flatMap((child) => [
			child.slug,
			...collectDescendants(child),
		]);

		descendantsBySlug.set(category.slug, descendants);

		return descendants;
	};

	const traverse = (items: Category[], parentSlug: string | null = null) => {
		for (const category of items) {
			parentBySlug.set(category.slug, parentSlug);

			collectDescendants(category);

			traverse(category.children ?? [], category.slug);
		}
	};

	traverse(categories);

	return {
		parentBySlug,
		descendantsBySlug,
	};
}
