import { Product } from "@/types/productsType";

export default function findOnSaleProducts(productsArr: Product[]) {
    const onSaleProducts: Product[] = [];
    productsArr.map((product) => {
        if (product.on_sale) onSaleProducts.push(product);
    });
    return onSaleProducts;
}
