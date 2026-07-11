import { getQueries } from "@/app/api/utils/readQueries";
import { Category } from "@/types/productsType";
import readBrandsTreeFile from "../utils/readBrandsTreeFile";

export async function GET(req: Request) {
	const queries = getQueries(req.url);
	const brand = queries.brand;

	const modelCategories: Category[] =
		(await readBrandsTreeFile()).find((c: Category) => c.slug === brand)
			?.children ?? [];

	return new Response(JSON.stringify(modelCategories), {
		headers: {
			"content-type": "application/json",
		},
		status: 200,
	});
}
