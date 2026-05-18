import { createSlice } from "@reduxjs/toolkit";
import results from "../../compData/OfferLetterData";

const initialState = {
    value: 0,
    total: results.length / 10,
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1; // Toolkit allows this safely
        },
        decrement: (state) => {
            state.value -= 1;
        },
    },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
