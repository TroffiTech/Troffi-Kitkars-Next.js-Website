import { ParsedRoute } from "@/types/utilsTypes";

export function parseRoute(
	pathname: string,
	searchParams: URLSearchParams,
): ParsedRoute {
	const segments = pathname.split("/").filter(Boolean);

	const brand = segments[0] ?? "";
	const categories = segments.slice(1);
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
		brand,
		categories,
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
