import { configureStore } from "@reduxjs/toolkit";
import queryReducer from "./querySlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    query: queryReducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
