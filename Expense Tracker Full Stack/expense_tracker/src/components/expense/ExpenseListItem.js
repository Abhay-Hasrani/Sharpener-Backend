import { useState } from "react";
import DeleteButton from "../UI/DeleteButton";
import EditButton from "../UI/EditButton";
import "./ExpenseListItem.css";
const ExpenseListItem = (props) => {
  const [showDescription, setShowDescription] = useState(false);
  const expenseObj = props.expenseObj;
  const amount = expenseObj.amount;
  const description = expenseObj.description;
  const category = expenseObj.category;

  function onDeleteClickHandler() {
    props.onDeleteClickHandler(expenseObj._id);
  }

  function onEditClickHandler() {
    // props.onEditClickHandler();
    // alert("coming soon");
  }
  return (
    <>
      <li
        onClick={() => setShowDescription(!showDescription)}
        className="expense-list-item"
        id="expense-list-item"
      >
        <div className="amount">{amount}₹‎</div>
        <div className="category">{category}</div>

        <div className="expense-list-item-buttons">
          <EditButton onClick={onEditClickHandler} />
          <DeleteButton onClick={onDeleteClickHandler} />
        </div>
      </li>
      {
      // showDescription && (
        <div className={"description " + (showDescription ? "open" : "")}>
          {description}
        </div>
      // )
      }
    </>
  );
};
export default ExpenseListItem;
