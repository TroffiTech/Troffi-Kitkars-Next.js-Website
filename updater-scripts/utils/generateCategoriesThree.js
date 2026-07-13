export function generateCategoriesTree(categoriesList) {
	const categoryMap = new Map();

	for (const cat of categoriesList) {
		categoryMap.set(cat.id, {
			id: cat.id,
			name: cat.name,
			slug: cat.slug,
			parent: cat.parent,
			count: cat.count,
			children: [],
		});
	}

	const roots = [];

	for (const [id, category] of categoryMap) {
		if (category.parent === 0 && category.count !== 0) {
			roots.push(category);
		} else {
			const parent = categoryMap.get(category.parent);
			if (parent && parent.count !== 0) {
				parent.children.push(category);
			}
		}
	}

	return roots;
}
