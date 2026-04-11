import { getQueries } from "@/app/api/utils/readQueries";
import { readAllProductsFile } from "../utils/readAllProductsFile";

export async function GET(req: Request) {
	const queries = getQueries(req.url);
	const productSku = queries.sku;

	const data = await readAllProductsFile();

	if (!data) throw new Error("Endpoint: Failed to read allProducts.json");

	const productData = data.filter((item) => item.sku === productSku);

	return new Response(JSON.stringify(productData), {
		headers: {
			"content-type": "application/json",
		},
		status: 200,
	});
}
