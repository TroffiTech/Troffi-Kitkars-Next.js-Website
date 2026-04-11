async function fetchProduct(url) {
  const res = await fetch(url, {
    headers: {
      authorization: `Basic ${btoa(
        process.env.WC_KEY + ":" + process.env.WC_SECRET
      )}`,
      "content-type": "application/json",
    },
  });

  return await res.json();
}

export default async function loadAllProducts() {
  console.log("fetching products...");

  const res = await fetch(
    `${process.env.DB_URL}/wp-json/wc/v3/products?per_page=10`,
    {
      headers: {
        authorization: `Basic ${btoa(
          process.env.WC_KEY + ":" + process.env.WC_SECRET
        )}`,
        "content-type": "application/json",
      },
    }
  );
  const productsQuantity = Number(res.headers.get("x-wp-total"));
  const pagesQuantity = Math.ceil(productsQuantity / 100);

  const promises = [];

  new Array(pagesQuantity).fill(null).map((_, index) => {
    const curPage = index + 1;
    promises.push(
      fetchProduct(
        `${process.env.DB_URL}/wp-json/wc/v3/products?per_page=100&page=${curPage}`
      )
    );
  });

  const allProducts = await Promise.all(promises);

  console.info("products list object are loaded");
  return allProducts.flat();
}
