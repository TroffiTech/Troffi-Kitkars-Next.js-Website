import { Category } from "@/types/productsType";

export default function flattenCategories(categories: Category[]): Category[] {
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
