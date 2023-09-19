import { createSlice } from "@reduxjs/toolkit";
import myUrls from "../../utils/myUrls";
import { UIActions } from "./UiReducer";
import axios from "axios";
const initialState = { expenses: [], filteredExpenses: null };
const ExpenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    replaceExpenses(state, action) {
      state.expenses = action.payload;
      state.filteredExpenses = null;
    },
    addExpense(state, action) {
      state.expenses = [...state.expenses, action.payload];
    },
    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(
        (item) => item.id !== action.payload.id
      );
    },
    replaceFilteredExpenses(state, action) {
      state.filteredExpenses = action.payload;
    },
  },
});
export function getAllExpenses(pageNo=1) {
  const pageItems = localStorage.getItem("pageItems") || 5;
  return async (dispatch) => {
    const result = await axios.get(
      myUrls.expenseBaseUrl + `/?pageNo=${pageNo}&pageItems=${pageItems}`
    );
    const { expenses, ...pagination } = result.data;
    dispatch(UIActions.setPagination(pagination));
    dispatch(expenseActions.replaceExpenses(expenses));
  };
}
export const expenseActions = ExpenseSlice.actions;
export default ExpenseSlice.reducer;
