import { getQueries } from "@/app/api/utils/readQueries";
import readCategoriesThreeFile from "../utils/readCategoriesThreeFile";
import { Category } from "@/types/productsType";

export async function GET(req: Request) {
	const { category } = getQueries(req.url);
	const categoriesThree = await readCategoriesThreeFile();

	let objToReturn;
	let currentCategoryName;

	if (!categoriesThree) throw new Error("Endpoint: Failed to read categoriesTree");

	categoriesThree.map((parentCategory) => {
		if (parentCategory.slug === category) {
			currentCategoryName = parentCategory.name;
			objToReturn = { ...parentCategory };
		} else {
			parentCategory.children?.map((childrenCategory: Category) => {
				if (childrenCategory.slug === category) {
					currentCategoryName = childrenCategory.name;
					objToReturn = { ...parentCategory };
				}
			});
		}
	});

	return new Response(JSON.stringify([objToReturn, currentCategoryName]), {
		headers: {
			"content-type": "application/json",
		},
		status: 200,
	});
}
