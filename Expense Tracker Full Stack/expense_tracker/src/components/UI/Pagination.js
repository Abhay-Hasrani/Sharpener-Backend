import { useDispatch, useSelector } from "react-redux";
import "./Pagination.css";
import { getAllExpenses } from "../store/ExpenseReducer";
const Pagination = () => {
  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    lastPage,
  } = useSelector((state) => state.UI.pagination);
  const dispatch = useDispatch();

  function pageClickHandler(pageNo) {
    dispatch(getAllExpenses(pageNo));
  }

  return (
    <div className="d-flex justify-content-evenly">
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
    </div>
  );
};

export default Pagination;
