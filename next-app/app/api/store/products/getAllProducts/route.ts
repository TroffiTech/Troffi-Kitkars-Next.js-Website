import readAllProductsFile from "../utils/readAllProductsFile";
import { getQueries } from "@/app/api/utils/readQueries";

export async function GET(req: Request) {
	const queries = getQueries(req.url);
	const page: number = +queries.page;
	const sortOrder = queries.order;

	const data = (await readAllProductsFile()).sort((a: any, b: any) =>
		sortOrder === "increase" ? +a.price - +b.price : +b.price - +a.price,
	);

	return new Response(JSON.stringify(data.slice(page * 12 - 12, page * 12)), {
		headers: {
			"content-type": "application/json",
			"x-total-count": `${Math.ceil(data.length / 12)}`,
		},
		status: 200,
	});
}
