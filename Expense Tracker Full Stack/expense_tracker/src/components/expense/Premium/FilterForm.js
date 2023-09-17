import "./FilterForm.css";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/ExpenseReducer";

const FilterForm = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense.expenses);

  function filterList(prevList, userData) {
    const from = new Date(userData.from);
    const to = new Date(userData.to);
    const newList = prevList.filter((expense) => {
      const createdAt = new Date(expense.createdAt);
      return createdAt >= from && createdAt <= to;
    });
    return newList;
  }

  function filterFormHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {};
    for (const [name, value] of formData.entries()) userData[name] = value;
    // console.log(new Date(userData.from).toDateString());
    // console.log(userData);

    const newList = filterList(expenses, userData);
    dispatch(expenseActions.replaceFilteredExpenses(newList));
  }

  return (
    <form
      className="date-form"
      id="filter-by-date-form"
      onSubmit={filterFormHandler}
    >
      <input
        type="date"
        placeholder="from yyyy-MM-dd"
        className="form__field date-input"
        id="date-from"
        name="from"
      />
      <input
        type="date"
        className="form__field date-input"
        id="date-to"
        name="to"
      />
      <button type="submit" className="button-81">
        Filter
      </button>
    </form>
  );
};
export default FilterForm;
