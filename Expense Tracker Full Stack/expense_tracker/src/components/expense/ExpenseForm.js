import axios from "axios";
import myUrls from "../../utils/myUrls";
import "./ExpenseForm.css";
import { useDispatch } from "react-redux";
import { expenseActions } from "../store/ExpenseReducer";
const ExpenseForm = () => {
  const dispatch = useDispatch();

  async function addExpenseFormHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const expenseObj = {};
    for (const [name, value] of formData.entries()) expenseObj[name] = value;
    try {
      console.log(expenseObj);
      const addedExpenseObj = await axios.post(myUrls.addExpenseUrl, {
        ...expenseObj,
      });
      // window.location.href = "./auth.html";
      // addExpenseListItemToUI(addedExpenseObj.data);
      dispatch(expenseActions.addExpense(addedExpenseObj.data));
    } catch (error) {
      alert(error.response.statusText);
    }
  }
  return (
    <>
      <div className="form-box">
        <form
          id="expense-form"
          className="form"
          onSubmit={addExpenseFormHandler}
        >
          <div className="title">Add an Expense</div>

          <div className="form__group field">
            <input
              type="number"
              className="form__field"
              placeholder="Amount"
              name="amount"
              id="amount"
              required
            />
            <label className="form__label">Amount</label>
          </div>
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Description"
              name="description"
              id="description"
              required
            />
            <label className="form__label">Description</label>
          </div>
          <div className="box">
            <select name="category" defaultValue="Others" required>
              <option>Others</option>
              <option>Food</option>
              <option>Movies</option>
              <option>Petrol</option>
              <option>Shopping</option>
              <option>Travel</option>
            </select>
          </div>

          <button type="submit" className="diagonal-button">
            Add Expense
          </button>
        </form>
      </div>

      <div className="horizontal-line"></div>
    </>
  );
};

export default ExpenseForm;
