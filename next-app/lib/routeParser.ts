import { brandsCards } from "@/components/brandsData";
import { ParsedRoute } from "@/types/utilsTypes";

export function parseRoute(
	pathname: string,
	searchParams: URLSearchParams,
): ParsedRoute {
	const brandsSlugs = brandsCards.map((brand) => brand.slug);
	const segments = pathname.split("/").filter(Boolean);
	const isBrandRoute = brandsSlugs.includes(segments[0]);
	const normalizedSegments =
		segments[0] === "catalog" ? segments.slice(1) : segments;

	const models =
		searchParams
			.get("model")
			?.split(",")
			.map((item) => item.trim())
			.filter(Boolean) ?? [];
	const search = searchParams.get("search") || "";
	const order =
		searchParams.get("order") === "decrease" ? "decrease" : "increase";

	return {
		brand: isBrandRoute ? segments[0] : "",
		categories: isBrandRoute ? normalizedSegments.slice(1) : normalizedSegments,
		models,
		order,
		search,
	};
}

export function buildRoute({
	brand,
	categories,
	models,
	search,
	order,
}: ParsedRoute) {
	const pathname = "/" + [brand, ...categories].filter(Boolean).join("/");
	const params = new URLSearchParams();

	if (models.length) {
		params.set("model", models.join(","));
	}
	if (search) {
		params.set("search", search);
	}
	if (order === "decrease") {
		params.set("order", "decrease");
	}
	return `${pathname}${params.toString() ? `?${params}` : ""}`;
}
