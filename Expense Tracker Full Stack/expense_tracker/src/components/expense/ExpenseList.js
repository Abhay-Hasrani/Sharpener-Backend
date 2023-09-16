import "./ExpenseList.css";
import ExpenseListItem from "./ExpenseListItem";
import axios from "axios";
import myUrls from "../../utils/myUrls";
import LeaderBoardList from "./LeaderBoardList";
import DownloadList from "./DownloadList";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/ExpenseReducer";
import Pagination from "../UI/Pagination";
const ExpenseList = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense.expenses);
  const showDownloads = useSelector((state) => state.UI.showDownloads);
  const showLeaderBoard = useSelector((state) => state.UI.showLeaderBoard);
  const filteredExpenses = useSelector(
    (state) => state.expense.filteredExpenses
  );
  const expensesArr = filteredExpenses ? filteredExpenses : expenses;
  const expenseList = expensesArr.map((item, index) => (
    <ExpenseListItem
      key={index}
      onDeleteClickHandler={onDeleteClickHandler}
      expenseObj={item}
    />
  ));
  async function onDeleteClickHandler(id) {
    try {
      const result = await axios.delete(myUrls.deleteExpenseUrl + id);
      console.log(result.data.message);
      dispatch(expenseActions.deleteExpense({ id }));
    } catch (error) {
      alert(error.response.statusText);
    }
  }

  return (
    <>
      {showLeaderBoard && <LeaderBoardList />}
      {showDownloads && <DownloadList />}

      <div id="expense-title" className="list-title">
        Expenses
      </div>
      <ul className="expense-list" id="expense-list">
        {expenseList}
      </ul>
      <Pagination />
    </>
  );
};
export default ExpenseList;
