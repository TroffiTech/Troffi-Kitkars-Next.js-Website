import { Category } from "@/types/productsType";
import readBrandsTreeFile from "../utils/readBrandsTreeFile";

export async function GET() {
	const brands: Category[] = await readBrandsTreeFile();
	return new Response(JSON.stringify(brands), {
		headers: {
			"content-type": "application/json",
		},
		status: 200,
	});
}
