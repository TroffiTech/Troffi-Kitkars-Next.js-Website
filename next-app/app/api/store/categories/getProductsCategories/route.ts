import { Category } from "@/types/productsType";
import readCategoriesTreeFile from "../utils/readCategoriesTreeFile";

export async function GET() {
	const productsCategories: Category[] = await readCategoriesTreeFile();

	return new Response(JSON.stringify(productsCategories), {
		headers: {
			"content-type": "application/json",
		},
		status: 200,
	});
}
