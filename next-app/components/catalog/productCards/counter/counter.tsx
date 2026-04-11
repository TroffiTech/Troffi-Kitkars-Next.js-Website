import { useDispatch } from "react-redux";
import styles from "./counter.module.scss";
import { ProductInCart } from "@/types/productsType";
import { setItemQuantity } from "@/store/cart/cartSlice";

export default function Counter({ product }: { product: ProductInCart }) {
    const { sku, quantity } = product;
    const dispatch = useDispatch();

    function handleCounting(action: "increase" | "decrease") {
        switch (action) {
            case "increase":
                dispatch(setItemQuantity({ sku, quantity: quantity + 1 }));
                return;
            case "decrease":
                dispatch(setItemQuantity({ sku, quantity: quantity === 1 ? 1 : quantity - 1 }));
                return;
        }
    }

    return (
        <div className={styles.counter}>
            <button onClick={() => handleCounting("decrease")}>-</button>
            <button onClick={() => handleCounting("increase")}>+</button>
            <p>{product.quantity}</p>
        </div>
    );
}
