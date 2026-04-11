import { getCachedOrRead } from "@/app/api/utils/contentCache";
import { getFilePath } from "@/app/api/utils/getContentPaths";
import { Product } from "@/types/productsType";
import { promises as fs } from "fs";

const filePath = getFilePath("allProducts.json");

async function readProductsFromDisk(): Promise<Product[]> {
	const fileContents = await fs.readFile(filePath, "utf8");
	const allProducts: Product[] = JSON.parse(fileContents);

	return allProducts.filter(
		(item: Product) =>
			item && typeof item === "object" && "status" in item && item.status === "publish",
	);
}

export async function readAllProductsFile(): Promise<Product[]> {
	try {
		return await getCachedOrRead(filePath, readProductsFromDisk);
	} catch (error) {
		throw new Error("Function readAllProductsFile failed: " + error);
	}
}
