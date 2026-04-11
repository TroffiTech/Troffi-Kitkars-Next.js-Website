import { promises as fs } from "node:fs";
import path from "path";

export default async function writeSitemapFile(xmlContent, outputDir) {
	try {
		const filePath = path.join(outputDir, "sitemap.xml");
		await fs.writeFile(filePath, xmlContent, { encoding: "utf8" });
		console.log(`Sitemap written to ${filePath}`);
	} catch (error) {
		console.error("Error writing sitemap:", error);
		throw error;
	}
}
