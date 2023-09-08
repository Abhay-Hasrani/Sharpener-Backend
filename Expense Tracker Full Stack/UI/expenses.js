const expenseForm = document.getElementById("expense-form");
const expenseListItem = document.getElementById("expense-list-item");
const expenseList = document.getElementById("expense-list");
const premiumBtn = document.getElementById("premium-btn");

const baseUrl = "http://localhost:3000";

const expenseBaseUrl = baseUrl + "/expense";
const addExpenseUrl = expenseBaseUrl + "/add-expense";
const deleteExpenseUrl = expenseBaseUrl + "/delete-expense/";

const purchaseBaseUrl = baseUrl + "/purchase";
const purchasePremiumUrl = purchaseBaseUrl + "/premium";
const updateTransactionStatusUrl = purchaseBaseUrl + "/updateTransactionStatus";

const AuthenticationToken = localStorage.getItem("token");
axios.defaults.headers.common["AuthenticationToken"] = AuthenticationToken;

document.addEventListener("DOMContentLoaded", async (e) => {
  try {
    while (expenseList.hasChildNodes())
      expenseList.removeChild(expenseList.firstChild);
    const isPremium = new URLSearchParams(window.location.search).get(
      "isPremium"
    );
    if (isPremium==="true") premiumBtn.style.display = "none";
    const result = await axios.get(expenseBaseUrl);
    const expenses = result.data;
    for (const expense of expenses) addListItemToUI(expense);
  } catch (error) {
    alert(error.response.statusText);
  }
});

function addListItemToUI(expenseObj) {
  // console.log(expenseObj);
  const newListItem = expenseListItem.cloneNode(true);
  newListItem.removeAttribute("id");

  const deleteButton = newListItem.querySelector("#delete-button");
  deleteButton.removeAttribute("id");

  const editButton = newListItem.querySelector("#edit-button");
  editButton.removeAttribute("id");

  const amountElement = newListItem.querySelector(".amount");
  const categoryElement = newListItem.querySelector(".category");
  const descriptionElement = newListItem.querySelector(".description");

  amountElement.textContent = expenseObj.amount + "₹‎";
  categoryElement.textContent = expenseObj.category;
  descriptionElement.textContent = expenseObj.description;

  // console.log(newListItem);
  newListItem.style.display = "flex";

  deleteButton.addEventListener("click", async (e) => {
    try {
      const result = await axios.delete(deleteExpenseUrl + expenseObj.id);
      console.log(result.data.message);
      newListItem.remove();
    } catch (error) {
      alert(error.response.statusText);
    }
  });

  expenseList.append(newListItem);
}

expenseForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(expenseForm);
  const expenseObj = {};
  for (const [name, value] of formData.entries()) expenseObj[name] = value;
  try {
    console.log(expenseObj);
    const addedExpenseObj = await axios.post(addExpenseUrl, { ...expenseObj });
    // window.location.href = "./auth.html";
    addListItemToUI(addedExpenseObj.data);
  } catch (error) {
    alert(error.response.statusText);
  }
});

premiumBtn.addEventListener("click", async (e) => {
  try {
    const response = await axios.get(purchasePremiumUrl);
    const options = {
      key: response.data.key_id,
      order_id: response.data.order.id,
      handler: async function (response) {
        if (!response.razorpay_payment_id) {
          throw new Error("Couldn't Complete Premium Transaction");
        }
        const result = await axios.post(updateTransactionStatusUrl, {
          orderID: options.order_id,
          paymentID: response.razorpay_payment_id,
        });
        // console.log(result);
        alert("Premium activated");
        e.target.remove();
      },
    };
    const rzp = new Razorpay(options);
    rzp.open();
    e.preventDefault();
  } catch (error) {
    console.log(error.message);
  }
});
