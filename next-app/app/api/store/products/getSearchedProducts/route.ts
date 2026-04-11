import { getQueries } from "@/app/api/utils/readQueries";
import fuzzySearch from "../utils/fuzzySearch";

export async function GET(req: Request) {
	const queries = getQueries(req.url);
	const page: number = +queries.page;
	const searchQuery: string = decodeURI(queries.request);

	const data = await fuzzySearch(searchQuery);

	return new Response(JSON.stringify(data.slice(page * 12 - 12, page * 12)), {
		headers: {
			"content-type": "application/json",
			"x-total-count": `${Math.ceil(data.length / 12)}`,
		},
		status: 200,
	});
}
