import { getQueries } from "@/app/api/utils/readQueries";
import { readAllProductsFile } from "../utils/readAllProductsFile";
import findOnSaleProducts from "../utils/findOnSaleProducts";

export async function GET(req: Request) {
	const queries = getQueries(req.url);
	const page: number = +queries.page;
	const sortOrder = queries.order;

	const allProducts = (await readAllProductsFile())?.sort((a, b) =>
		sortOrder === "increase" ? +a.price - +b.price : +b.price - +a.price
	);

	if (!allProducts) throw new Error("Endpoint: Failed to read allProducts.json");

	const data = findOnSaleProducts(allProducts);

	return new Response(JSON.stringify(data.slice(page * 10 - 10, page * 10)), {
		headers: {
			"content-type": "application/json",
			"x-total-count": `${Math.ceil(data.length / 10)}`,
		},
		status: 200,
	});
}
