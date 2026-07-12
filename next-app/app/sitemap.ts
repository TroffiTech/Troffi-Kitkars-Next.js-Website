import type { MetadataRoute } from "next";

import flattenCategories from "@/app/api/store/categories/utils/flattenCategories";
import readBrandsTreeFile from "@/app/api/store/categories/utils/readBrandsTreeFile";
import readCategoriesTreeFile from "@/app/api/store/categories/utils/readCategoriesTreeFile";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const site = process.env.DOMEN!;

	const brands = flattenCategories(await readBrandsTreeFile());
	const categories = flattenCategories(await readCategoriesTreeFile());

	const pages: MetadataRoute.Sitemap = [
		{
			url: site,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: `${site}/contacts`,
			lastModified: new Date(),
			priority: 0.7,
		},
		{
			url: `${site}/delivery`,
			lastModified: new Date(),
			priority: 0.7,
		},
		{
			url: `${site}/offer`,
			lastModified: new Date(),
			priority: 0.7,
		},
		{
			url: `${site}/policy`,
			lastModified: new Date(),
			priority: 0.4,
		},
		{
			url: `${site}/registry`,
			lastModified: new Date(),
			priority: 0.8,
		},
		{
			url: `${site}/catalog`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.9,
		},
	];

	// Brand pages
	for (const brand of brands) {
		pages.push({
			url: `${site}/${brand.slug}`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		});
	}

	// Category pages
	for (const category of categories) {
		pages.push({
			url: `${site}/${category.slug}`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		});
	}

	// Brand + category pages
	for (const brand of brands) {
		for (const category of categories) {
			pages.push({
				url: `${site}/${brand.slug}/${category.slug}`,
				lastModified: new Date(),
				changeFrequency: "weekly",
				priority: 0.8,
			});
		}
	}

	return pages;
}
