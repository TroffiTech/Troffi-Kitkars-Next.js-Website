import { serverConfig } from "@/lib/config/server";
import fs from "fs/promises";
import path from "path";

const CONTENT_PATH =
	serverConfig.contentPath || "/var/www/kitkars/content-data";
const PRODUCTS_FILE = "allProducts.json";

export default async function readCategoriesTreeFile() {
	try {
		const filePath = path.join(CONTENT_PATH, PRODUCTS_FILE);
		const content = await fs.readFile(filePath, "utf-8");
		return JSON.parse(content);
	} catch {
		console.error("Products file not founds");
		return [];
	}
}
