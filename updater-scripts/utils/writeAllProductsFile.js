import { promises as fs } from "node:fs";
import path from "path";

export default async function writeAllProductsFile(allProducts, dir_path) {
	try {
		const data = JSON.stringify(allProducts, null, 2);
		const filePath = path.join(dir_path, "allProducts.json");

		await fs.writeFile(filePath, data, { encoding: "utf8" });
		console.log(`All products file written to ${filePath}`);
	} catch (error) {
		console.error(`Error writing products file:`, error);
		throw error;
	}
}
