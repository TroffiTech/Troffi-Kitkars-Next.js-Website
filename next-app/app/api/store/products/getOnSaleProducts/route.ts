import findOnSaleProducts from "../utils/findOnSaleProducts";
import { readAllProductsFile } from "../utils/readAllProductsFile";

export async function GET() {
	const data = await readAllProductsFile();

	if (!data) throw new Error("Endpoint: Failed to read allProducts.json");

	const onSaleProducts = findOnSaleProducts(data);

	return new Response(JSON.stringify(onSaleProducts.slice(0, 6)), {
		headers: {
			"content-type": "application/json",
		},
		status: 200,
	});
}
