import axios from "axios";
import "./Premium.css";
import myUrls from "../../../utils/myUrls";
import useRazorpay from "react-razorpay";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UIActions } from "../../store/UiReducer";
import FilterForm from "./FilterForm";
const Premium = () => {
  const dispatch = useDispatch();
  const isPremium = useSelector((state) => state.UI.isPremium);
  const [Razorpay] = useRazorpay();
  const [showFilter, setShowFilter] = useState(false);
  async function downloadClickHandler(e) {
    try {
      const downloadResult = await axios.get(myUrls.downloadExpenseUrl);
      if (downloadResult.status === 201) {
        const { fileUrl } = downloadResult.data;
        console.log(fileUrl);
        const a = document.createElement("a");
        a.href = fileUrl;
        a.download = "Expenses.csv";
        a.click();
      }
    } catch (err) {
      console.log("Error while downloading expenses");
      console.log(err);
    }
  }

  async function premiumBtnClickHandler(e) {
    try {
      const response = await axios.get(myUrls.purchasePremiumUrl);
      const options = {
        key: response.data.key_id,
        order_id: response.data.order.id,
        handler: async function (response) {
          if (!response.razorpay_payment_id) {
            throw new Error("Couldn't Complete Premium Transaction");
          }
          const result = await axios.post(myUrls.updateTransactionStatusUrl, {
            orderID: options.order_id,
            paymentID: response.razorpay_payment_id,
          });
          // console.log(result);
          localStorage.setItem("token", result.data.token);
          dispatch(UIActions.setIsPremium(true));
          console.log("Premium activated");
          // e.target.remove();
        },
      };
      const rzp = new Razorpay(options);
      rzp.open();
      e.preventDefault();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div className="premium-box">
        {!isPremium && (
          <button
            className="premium-btn"
            id="premium-btn"
            onClick={premiumBtnClickHandler}
          ></button>
        )}
        {isPremium && (
          <button className="pro-btn" disabled>
            Pro Features
          </button>
        )}
        {isPremium && (
          <div id="premium-features">
            <button
              className="premium-feature-btn"
              id="leaderboard-btn"
              onClick={() => dispatch(UIActions.toggleLeaderBoard())}
            >
              Leaderboard
            </button>
            <button
              className="premium-feature-btn"
              id="filter-by-date-btn"
              onClick={() => setShowFilter((prev) => !prev)}
            >
              Filter
            </button>
            <button
              className="download-btn"
              id="download-btn"
              onClick={downloadClickHandler}
            >
              Download
            </button>
            <button
              className="premium-feature-btn"
              id="all-downloads-btn"
              onClick={() => dispatch(UIActions.toggleDownloads())}
            >
              All Downloads
            </button>
          </div>
        )}
      </div>
      {showFilter && <FilterForm />}
    </>
  );
};
export default Premium;
