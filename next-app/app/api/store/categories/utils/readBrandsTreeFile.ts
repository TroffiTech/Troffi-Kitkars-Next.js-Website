import { serverConfig } from "@/lib/config/server";
import fs from "fs/promises";
import path from "path";

const CONTENT_PATH =
	serverConfig.contentPath || "/var/www/kitkars/content-data";
const CATEGORIES_FILE = "BrandsTree.json";

export default async function readBrandsTreeFile() {
	try {
		const filePath = path.join(CONTENT_PATH, CATEGORIES_FILE);
		const content = await fs.readFile(filePath, "utf-8");
		return JSON.parse(content);
	} catch {
		console.error("Brands file not found");
		return [];
	}
}
