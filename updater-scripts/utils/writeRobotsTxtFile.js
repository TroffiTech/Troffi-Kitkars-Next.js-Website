import { promises as fs } from "node:fs";
import path from "path";

export default async function writeRobotsTxtFile(outputDir) {
	try {
		const content = `User-agent: *
Allow: /*
Allow: /catalog/product/*
Disallow: /checkout/
Disallow: /catalog/search/
Sitemap: ${process.env.DOMEN}/sitemap.xml`;

		const filePath = path.join(outputDir, "robots.txt");
		await fs.writeFile(filePath, content, { encoding: "utf8" });
		console.log(`robots.txt written to ${filePath}`);
	} catch (error) {
		console.error("Error writing robots.txt:", error);
		throw error;
	}
}
