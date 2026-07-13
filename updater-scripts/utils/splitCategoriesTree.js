export default function splitCategoriesTree(tree) {
	const carsRoot = tree.find((category) => category.slug === "avtomobily");

	return {
		brandsTree: carsRoot?.children ?? [],
		categoriesTree: tree.filter((category) => category.slug !== "avtomobily"),
	};
}
