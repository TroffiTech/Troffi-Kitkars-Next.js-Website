import { readAllProductsFile } from "../utils/readAllProductsFile";

export async function GET() {
	const data = await readAllProductsFile();

	if (!data) throw new Error("Endpoint: Failed to read allProducts.json");

	return new Response(JSON.stringify(data.slice(0, 10)), {
		headers: {
			"content-type": "application/json",
		},
		status: 200,
	});
}
