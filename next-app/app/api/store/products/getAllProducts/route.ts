import { readAllProductsFile } from "../utils/readAllProductsFile";
import { getQueries } from "@/app/api/utils/readQueries";

export const dynamic = "force-dynamic"; // Отключаем кэширование

export async function GET(req: Request) {
	const queries = getQueries(req.url);
	const page: number = +queries.page;
	const sortOrder = queries.order;

	const data = (await readAllProductsFile())?.sort((a, b) =>
		sortOrder === "increase" ? +a.price - +b.price : +b.price - +a.price
	);

	if (!data) throw new Error("Endpoint: Failed to load AllProducts.json");

	return new Response(JSON.stringify(data.slice(page * 12 - 12, page * 12)), {
		headers: {
			"content-type": "application/json",
			"x-total-count": `${Math.ceil(data.length / 12)}`,
			"Cache-Control": "no-cache, no-store, must-revalidate", // Отключаем кэш браузера
		},
		status: 200,
	});
}
