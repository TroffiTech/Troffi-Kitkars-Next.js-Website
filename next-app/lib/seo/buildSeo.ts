import { SeoContext } from "@/types/seo/seoTypes";

export function buildTitle(seo: SeoContext) {
	const parts = [];

	if (seo.categories.length) {
		parts.push(seo.categories.map((c) => c.name).join(", "));
	}
	if (seo.brand) {
		parts.push(`для ${seo.brand.name}`);
	}
	if (seo.models.length) {
		parts.push(seo.models.map((c) => c.name).join(", "));
	}
	parts.push("KITKARS.RU");

	return parts.join(" | ");
}

export function buildDescription(seo: SeoContext) {
	if (seo.brand && seo.categories.length) {
		return `${seo.categories.map((c) => c.name).join(", ")} для автомобилей ${seo.brand.name}. Большой выбор внедорожного оборудования.`;
	}
	if (seo.brand) {
		return `Каталог аксессуаров и внедорожного оборудования для ${seo.brand.name}.`;
	}
	if (seo.categories.length) {
		return `${seo.categories.map((c) => c.name).join(", ")}. Каталог внедорожного оборудования.`;
	}
	return "Каталог внедорожного оборудования.";
}

export function buildCanonical(seo: SeoContext) {
	const pathname = [seo.brand?.slug, ...seo.categories.map((c) => c.slug)]
		.filter(Boolean)
		.join("/");

	const params = new URLSearchParams();
	if (seo.models.length) {
		params.set("model", seo.models.map((m) => m.slug).join(","));
	}

	const query = params.toString();

	return `/${pathname}${query ? `?${query}` : ""}`;
}
