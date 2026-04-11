import { createSlice } from "@reduxjs/toolkit";

type ClientSlice = {
    value: {
        isMember: boolean;
    };
};

const initialState: ClientSlice = {
    value: { isMember: false },
};

const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        setIsMember: (state, action) => {
            state.value.isMember = action.payload;
        },
    },
});

export const { setIsMember } = clientSlice.actions;
export default clientSlice.reducer;
