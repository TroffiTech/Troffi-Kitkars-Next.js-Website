"use client";

import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/store/cart/cartSlice";
import { Product } from "@/types/productsType";
import { SmallPopupContext } from "@/hooks/smallPopupsProvider";
import { RootState } from "@/store/store";

export function AddToCartButton({ productData }: { productData: Product }) {
	const [isProductInCart, setIsProductInCart] = useState(false);

	const dispatch = useDispatch();
	const cart = useSelector((state: RootState) => state.cart.value);

	useEffect(() => {
		const selectedProduct = cart.filter((item) => item.sku === productData.sku)[0];
		if (!selectedProduct) return;
		else setIsProductInCart(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cart]);

	const setIsPopupVisible = useContext(SmallPopupContext).setIsVisible;
	const setPopupText = useContext(SmallPopupContext).setPopupText;

	function handleClick() {
		if (!setIsPopupVisible || !setPopupText || isProductInCart) return;

		setPopupText(`
            Товар добалвен в корзину!
            ${productData.name}
            `);
		setIsPopupVisible(true);
		dispatch(addToCart({ ...productData, quantity: 1 }));
	}

	return (
		<button
			style={{
				minWidth: "120px",
				background: `${isProductInCart ? "var(--orange-color)" : "var(--foreground-color)"}`,
			}}
			onClick={handleClick}
		>
			{isProductInCart ? "в корзине" : "в корзину"}
		</button>
	);
}

export function RemoveFromCartButton({ productData }: { productData: Product }) {
	const dispatch = useDispatch();

	const setIsPopupVisible = useContext(SmallPopupContext).setIsVisible;
	const setPopupText = useContext(SmallPopupContext).setPopupText;

	function handleClick() {
		if (!setIsPopupVisible || !setPopupText) return;

		setIsPopupVisible(true);
		setPopupText(`
            Товар убран из корзины!
            ${productData.name}
            `);
		dispatch(removeFromCart(productData));
	}
	return (
		<button
			style={{
				minWidth: "120px",
			}}
			onClick={handleClick}
		>
			убрать
		</button>
	);
}
