import { promises as fs } from "node:fs";
import path from "path";

export default async function writeCategoriesThreeFile(categoriesThree, dir_path) {
	try {
		const data = JSON.stringify(categoriesThree, null, 2);
		const filePath = path.join(dir_path, "categoriesThree.json");

		await fs.writeFile(filePath, data, { encoding: "utf8" });
		console.log(`Categories file written to ${filePath}`);
	} catch (error) {
		console.error(`Error writing categories file:`, error);
		throw error;
	}
}
