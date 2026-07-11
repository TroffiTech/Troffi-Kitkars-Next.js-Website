import { CategoryMaps } from "./categoryMaps";

export function toggleCategorySelection(
	currentSelection: string[],
	categorySlug: string,
	categoryMaps: CategoryMaps,
): string[] {
	const nextSelection = new Set(currentSelection);

	const descendants = categoryMaps.descendantsBySlug.get(categorySlug) ?? [];

	const isSelected = nextSelection.has(categorySlug);

	if (isSelected) {
		nextSelection.delete(categorySlug);
		descendants.forEach((slug) => nextSelection.delete(slug));
	} else {
		nextSelection.add(categorySlug);
		descendants.forEach((slug) => nextSelection.add(slug));
	}

	let parentSlug = categoryMaps.parentBySlug.get(categorySlug);

	while (parentSlug) {
		const parentDescendants =
			categoryMaps.descendantsBySlug.get(parentSlug) ?? [];

		const allChildrenSelected = parentDescendants.every((slug) =>
			nextSelection.has(slug),
		);

		if (allChildrenSelected) {
			nextSelection.add(parentSlug);
		} else {
			nextSelection.delete(parentSlug);
		}

		parentSlug = categoryMaps.parentBySlug.get(parentSlug);
	}

	return [...nextSelection];
}
