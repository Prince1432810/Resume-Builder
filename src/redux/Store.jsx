import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slicer/CounterSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});
