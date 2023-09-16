import DeleteButton from "../UI/DeleteButton";
import EditButton from "../UI/EditButton";
import "./ExpenseListItem.css";
const ExpenseListItem = (props) => {
  const expenseObj = props.expenseObj;
  const amount = expenseObj.amount;
  const description = expenseObj.description;
  const category = expenseObj.category;

  function onDeleteClickHandler() {
    props.onDeleteClickHandler(expenseObj.id);
  }
  return (
    <li className="expense-list-item" id="expense-list-item">
      <div className="amount">{amount}₹‎</div>
      <div className="category">{category}</div>
      <div className="description">{description}</div>

      <div className="expense-list-item-buttons">
        <DeleteButton onClick={onDeleteClickHandler} />
        <EditButton onClick={props.onEditClick} />
      </div>
    </li>
  );
};
export default ExpenseListItem;
