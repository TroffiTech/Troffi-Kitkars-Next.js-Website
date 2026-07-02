import * as dotenv from "dotenv";
import { XMLBuilder } from "fast-xml-parser";

dotenv.config();

export default async function updateSitemap(allProducts) {
	console.log("generating sitemap.xml file");

	const categoriesXmls = `<url>
<loc>${process.env.DOMEN || "https://kitkars.ru"}</loc>
<priority>1.0</priority>
</url>
<url>
<loc>${process.env.DOMEN || "https://kitkars.ru"}/sales</loc>
<priority>0.9</priority>
</url>
<url>
<loc>${process.env.DOMEN || "https://kitkars.ru"}/registry</loc>
<priority>0.9</priority>
</url>
<url>
<loc>${process.env.DOMEN || "https://kitkars.ru"}/contacts</loc>
<priority>0.9</priority>
</url>
<url>
<loc>${process.env.DOMEN || "https://kitkars.ru"}/delivery</loc>
<priority>0.9</priority>
</url>
<url>
<loc>${process.env.DOMEN || "https://kitkars.ru"}/catalog</loc>
<priority>0.9</priority>
</url>
<url>
<loc>
${process.env.DOMEN || "https://kitkars.ru"}/catalog/category/amortizatory
</loc>
<priority>0.9</priority>
</url>
<url>
<loc>${process.env.DOMEN || "https://kitkars.ru"}/catalog/category/lebedki</loc>
<priority>0.9</priority>
</url>
<url>
<loc>${process.env.DOMEN || "https://kitkars.ru"}/catalog/category/shnorkeli</loc>
<priority>0.9</priority>
</url>
<url>
<loc>${process.env.DOMEN || "https://kitkars.ru"}/catalog/category/pruzhiny</loc>
<priority>0.9</priority>
</url>
<url>
<loc>
${process.env.DOMEN || "https://kitkars.ru"}/catalog/category/reshyotki-radiatora
</loc>
<priority>0.9</priority>
</url>
<url>
<loc>${process.env.DOMEN || "https://kitkars.ru"}/offer</loc>
<priority>0.9</priority>
</url>
<url>
<loc>${process.env.DOMEN || "https://kitkars.ru"}/policy</loc>
<priority>0.9</priority>
</url>`;

	const productsUrls = [];
	allProducts.map((product) => {
		productsUrls.push({
			loc: `${process.env.DOMEN || "https://kitkars.ru"}/catalog/product/${product.slug}`,
			priority: 0.9,
			lastmod: new Date().toISOString(),
			changefreq: "monthly",
		});
	});

	const urlBuilder = new XMLBuilder({
		arrayNodeName: "url",
	});
	const productsXmls = urlBuilder.build(productsUrls);

	const xmlContent = `<?xml version='1.0' encoding='UTF-8'?><urlset  xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>${categoriesXmls}${productsXmls}</urlset>`;
	return xmlContent;
}
