import fs from "fs/promises";
import path from "path";

const CONTENT_PATH =
	process.env.CONTENT_PATH || "/var/www/kitkars/content-data";
const CATEGORIES_FILE = "categoriesThree.json";

export default async function readCategoriesThreeFile() {
	try {
		const filePath = path.join(CONTENT_PATH, CATEGORIES_FILE);
		const content = await fs.readFile(filePath, "utf-8");
		return JSON.parse(content);
	} catch {
		console.error("Categories file not found");
		return [];
	}
}
