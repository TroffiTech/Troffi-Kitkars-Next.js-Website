export default async function getCategories() {
	console.info("fetching all categories from WC API");

	const res = await fetch(`${process.env.DB_URL}/wp-json/wc/v3/products/categories?per_page=100`, {
		headers: {
			authorization: `Basic ${btoa(process.env.WC_KEY + ":" + process.env.WC_SECRET)}`,
			"content-type": "application/json",
		},
	});

	console.info("categories are fetched");
	return await res.json();
}
