import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: "/checkout",
		},
		sitemap: `${process.env.DOMEN}/sitemap.xml`,
		host: process.env.DOMEN,
	};
}
