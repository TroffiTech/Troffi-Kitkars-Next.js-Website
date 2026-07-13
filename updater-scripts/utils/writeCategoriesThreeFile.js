import { promises as fs } from "node:fs";
import path from "path";

export default async function writeCategoriesTreeFile(
	CategoriesTree,
	dir_path,
	FileName,
) {
	try {
		const data = JSON.stringify(CategoriesTree, null, 2);
		const filePath = path.join(dir_path, FileName);

		await fs.writeFile(filePath, data, { encoding: "utf8" });
		console.log(`Categories file written to ${filePath}`);
	} catch (error) {
		console.error(`Error writing categories file:`, error);
		throw error;
	}
}
