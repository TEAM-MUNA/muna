import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import counterReducer from "../slices/counterSlice";
import searchReducer from "../slices/searchSlice";
import interactionReducer from "../slices/interactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    search: searchReducer,
    interaction: interactionReducer,
  },
});

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
