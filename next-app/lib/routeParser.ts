import { ParsedRoute } from "@/types/utilsTypes";

export function parseRoute(
	pathname: string,
	searchParams: URLSearchParams,
): ParsedRoute {
	const segments = pathname.split("/").filter(Boolean);

	const brand = segments[0] ?? null;

	const categories = segments.slice(1);

	const models =
		searchParams
			.get("model")
			?.split(",")
			.map((item) => item.trim())
			.filter(Boolean) ?? [];

	return {
		brand,
		categories,
		models,
	};
}

export function buildRoute({ brand, categories, models }: ParsedRoute) {
	const pathname = "/" + [brand, ...categories].filter(Boolean).join("/");

	const params = new URLSearchParams();

	if (models.length) {
		params.set("model", models.join(","));
	}

	return `${pathname}${params.toString() ? `?${params}` : ""}`;
}
