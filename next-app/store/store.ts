import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cart/cartSlice";
import clientReducer from "./client/clientSlice";

const persistCartConfig = {
    key: "cart",
    storage,
};

const persistClientConfig = {
    key: "client",
    storage,
};

const persistedCartReducer = persistReducer(persistCartConfig, cartReducer);
const persistedClientReducer = persistReducer(persistClientConfig, clientReducer);

export const store = configureStore({
    reducer: {
        cart: persistedCartReducer,
        client: persistedClientReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
