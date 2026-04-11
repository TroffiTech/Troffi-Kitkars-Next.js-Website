import { getCachedOrRead } from "@/app/api/utils/contentCache";
import { getFilePath } from "@/app/api/utils/getContentPaths";
import { CategoriesThree } from "@/types/productsType";
import { promises as fs } from "fs";

const filePath = getFilePath("categoriesThree.json");

async function readCategoriesFromDisk() {
	const fileContents = await fs.readFile(filePath, "utf8");
	return JSON.parse(fileContents) as CategoriesThree;
}

export default async function readCategoriesThreeFile() {
	try {
		return await getCachedOrRead(filePath, readCategoriesFromDisk);
	} catch (error) {
		console.error("Error while reading categoriesThree.json:", error);
		throw error;
	}
}
