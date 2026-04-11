import { ProductInCart } from "@/types/productsType";
import { createSlice } from "@reduxjs/toolkit";

type CartState = {
	value: Array<ProductInCart>;
};

const initialState: CartState = {
	value: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const alreadyInCart = state.value.find((sameProd) => sameProd.sku === action.payload.sku);
			if (alreadyInCart) return;
			state.value = [...state.value, action.payload];
		},
		setItemQuantity: (state, action) => {
			const selectedItem = state.value.find((item) => item.sku === action.payload.sku);
			if (!selectedItem) return;
			selectedItem.quantity = action.payload.quantity;
		},
		removeFromCart: (state, action) => {
			const filteredState = state.value.filter((item) => item.sku !== action.payload.sku);
			state.value = filteredState;
		},
		resetCart: (state) => {
			state.value = [];
		},
	},
});

export const { addToCart, setItemQuantity, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
