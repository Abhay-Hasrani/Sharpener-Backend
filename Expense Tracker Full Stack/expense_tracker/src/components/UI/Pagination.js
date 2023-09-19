import { useDispatch, useSelector } from "react-redux";
import "./Pagination.css";
import { getAllExpenses } from "../store/ExpenseReducer";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
const Pagination = () => {
  const [selectedItem, setSelectedItem] = useState(
    localStorage.getItem("pageItems") || 5
  );
  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    lastPage,
  } = useSelector((state) => state.UI.pagination);
  const dispatch = useDispatch();

  function handleSelect(eventKey) {
    setSelectedItem(eventKey);
    localStorage.setItem("pageItems", +eventKey);
    dispatch(getAllExpenses());
  }

  function pageClickHandler(pageNo) {
    dispatch(getAllExpenses(pageNo));
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="pages">
        {hasPrevPage && (
          <button onClick={() => pageClickHandler(prevPage)}>&laquo;</button>
        )}
        {hasPrevPage && (
          <button onClick={() => pageClickHandler(prevPage)}>{prevPage}</button>
        )}
        <button
          className="active"
          // onClick={() => pageClickHandler(currentPage)}
        >
          {currentPage} of {lastPage}
        </button>
        {hasNextPage && (
          <button onClick={() => pageClickHandler(nextPage)}>{nextPage}</button>
        )}
        {hasNextPage && (
          <button onClick={() => pageClickHandler(nextPage)}>&raquo;</button>
        )}
      </div>
      <Dropdown data-bs-theme="dark" className="p-1" onSelect={handleSelect}>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          Rows : {selectedItem}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="5">5</Dropdown.Item>
          <Dropdown.Item eventKey="10">10</Dropdown.Item>
          <Dropdown.Item eventKey="15">15</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Pagination;
