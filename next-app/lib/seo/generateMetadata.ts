import type { Metadata } from "next";
import { createSeoContext } from "./createSeoContext";
import { buildCanonical, buildDescription, buildTitle } from "./buildSeo";

type Props = {
	params: Promise<{ slug?: string[] }>;
	searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
	params,
	searchParams,
}: Props): Promise<Metadata> {
	const { slug = [] } = await params;
	const query = await searchParams;

	const pathname = "/" + slug.join("/");

	const urlSearchParams = new URLSearchParams();

	for (const [key, value] of Object.entries(query)) {
		if (Array.isArray(value)) {
			value.forEach((v) => urlSearchParams.append(key, v));
		} else if (value) {
			urlSearchParams.set(key, value);
		}
	}
	const seo = await createSeoContext(pathname, urlSearchParams);
	return {
		title: buildTitle(seo),
		description: buildDescription(seo),
		alternates: {
			canonical: buildCanonical(seo),
		},
	};
}
