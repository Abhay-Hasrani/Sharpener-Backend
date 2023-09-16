import { configureStore } from "@reduxjs/toolkit";
import ExpenseReducer from "./ExpenseReducer";
import UiReducer from "./UiReducer";

const store = configureStore({
  reducer: { expense: ExpenseReducer, UI: UiReducer },
});
export default store;
