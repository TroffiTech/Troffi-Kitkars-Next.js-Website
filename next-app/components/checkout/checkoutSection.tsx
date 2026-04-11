"use client";

import { useSelector } from "react-redux";
import styles from "./checkoutSection.module.scss";
import { RootState } from "@/store/store";
import CheckoutForm from "./checkoutForm/checkoutForm";

export default function CheckoutSection() {
	const cart = useSelector((state: RootState) => state.cart.value);

	let totalPrice = 0;
	cart.map((elem) => {
		totalPrice += +elem.price * elem.quantity;
	});

	return (
		<div className={styles.checkoutSection}>
			<CheckoutForm />
			<div
				style={{
					gridColumn: "4/-1",
				}}
			>
				<ul className={styles.orderList}>
					<h3>Состав заказа</h3>
					{cart.map((product, index) => (
						<li key={product.id}>
							<div className={styles.nameBlock}>
								<p>{index + 1}.</p>
								<p>{product.name}</p>
								<p>{product.quantity} шт.</p>
							</div>
							<p>{+product.price * product.quantity} руб.</p>
						</li>
					))}
					<li className={styles.total}>
						Итого: <span>{totalPrice} руб.</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
