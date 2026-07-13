import { clientConfig } from "@/lib/config/client";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: "/checkout",
		},
		sitemap: `${clientConfig.siteUrl}/sitemap.xml`,
		host: clientConfig.siteUrl,
	};
}
