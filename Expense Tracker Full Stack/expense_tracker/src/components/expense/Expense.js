import React, { useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { useDispatch } from "react-redux";
import Premium from "./Premium/Premium";
import { parseJwt } from "../../utils/helper";
import axios from "axios";
import { getAllExpenses } from "../store/ExpenseReducer";
import { UIActions } from "../store/UiReducer";
const Expense = () => {
  const AuthenticationToken = localStorage.getItem("token");
  axios.defaults.headers.common["AuthenticationToken"] = AuthenticationToken;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllExpenses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(UIActions.setIsPremium(parseJwt(AuthenticationToken).isPremium));
  }, [dispatch, AuthenticationToken]);

  // console.log("Premium user :", isPremium);
  return (
    <div className="mb-5">
      <Premium />
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
};
export default Expense;
