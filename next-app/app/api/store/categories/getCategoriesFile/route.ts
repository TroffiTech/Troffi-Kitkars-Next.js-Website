import readCategoriesThreeFile from "../utils/readCategoriesThreeFile";

export async function GET() {
	const categoriesThreeFile = await readCategoriesThreeFile();

	return new Response(JSON.stringify(categoriesThreeFile), {
		headers: {
			"content-type": "application/json",
		},
		status: 200,
	});
}
