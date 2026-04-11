import { Product } from "@/types/productsType";
import { readAllProductsFile } from "./readAllProductsFile";

export function levenstainDistance(a: string, b: string) {
	// create matrix
	const matrix = Array(b.length + 1)
		.fill(null)
		.map(() => Array(a.length + 1).fill(null));

	// fill first row and first col in matrix
	for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
	for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

	// full fill matrix
	for (let j = 1; j <= b.length; j++) {
		for (let i = 1; i <= a.length; i++) {
			const cost = a[i - 1] === b[j - 1] ? 0 : 1;
			matrix[j][i] = Math.min(
				matrix[j][i - 1] + 1, // Deleting
				matrix[j - 1][i] + 1, // Inserting
				matrix[j - 1][i - 1] + cost // Switching
			);
		}
	}

	return matrix[b.length][a.length];
}

export default async function fuzzySearch(stringToSearch: string) {
	const result: Array<Product & { nameSimilarityRate: number }> = [];
	const data = await readAllProductsFile();

	if (!data) throw new Error("Endpoint: Failed to read allProducts.json");
	// sku search
	data.map((item) => {
		if (item.sku.startsWith(stringToSearch) || item.sku.includes(stringToSearch))
			result.push({ ...item, nameSimilarityRate: 1000 });
	});

	// fuzzy search
	const queryWords = stringToSearch.split(" ");

	data.map((product) => {
		let nameSimilarityRate = 0;

		const nameWords = product.name.split(" ");

		queryWords.map((queryWord) => {
			nameWords.map((nameWord: string) => {
				const distance = levenstainDistance(queryWord.toLowerCase(), nameWord.toLowerCase());
				if (distance <= 1) nameSimilarityRate += 100;
				if (distance <= 2) nameSimilarityRate += 3;
				if (distance <= 3) nameSimilarityRate += 1;
				else nameSimilarityRate -= 1;
			});
		});
		if (nameSimilarityRate > 80) result.push({ ...product, nameSimilarityRate });
	});

	return result.sort((a, b) => b.nameSimilarityRate - a.nameSimilarityRate);
}
