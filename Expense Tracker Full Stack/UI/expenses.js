const expenseForm = document.getElementById("expense-form");
const expenseListItem = document.getElementById("expense-list-item");
const expenseList = document.getElementById("expense-list");
const leaderBoardListItem = document.getElementById("leaderboard-list-item");
const leaderBoardList = document.getElementById("leaderboard-list");
const premiumBtn = document.getElementById("premium-btn");
const leaderboardBtn = document.getElementById("leaderboard-btn");
const listTitle = document.getElementById("list-title");
const premiumFeatures = document.getElementById("premium-features");
const filterByDateBtn = document.getElementById("filter-by-date-btn");
const filterByDateForm = document.getElementById("filter-by-date-form");

const baseUrl = "http://localhost:3000";

const expenseBaseUrl = baseUrl + "/expense";
const addExpenseUrl = expenseBaseUrl + "/add-expense";
const deleteExpenseUrl = expenseBaseUrl + "/delete-expense/";

const purchaseBaseUrl = baseUrl + "/purchase";
const purchasePremiumUrl = purchaseBaseUrl + "/premium";
const updateTransactionStatusUrl = purchaseBaseUrl + "/updateTransactionStatus";

const premiumBaseUrl = baseUrl + "/premium";
const leaderboardUrl = premiumBaseUrl + "/leaderboard";

let isFilterVisible = false;

const AuthenticationToken = localStorage.getItem("token");
axios.defaults.headers.common["AuthenticationToken"] = AuthenticationToken;

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function activatePremium() {
  const isPremium = parseJwt(AuthenticationToken).isPremium;
  // console.log(isPremium);
  if (isPremium) {
    premiumFeatures.style.display = "flex";
    const newElement = document.createElement("div");
    newElement.textContent = "Premium User : ";
    newElement.style =
      "color: white; font-size:20px; text-decoration:underline";
    premiumBtn.replaceWith(newElement);
  }
}

document.addEventListener("DOMContentLoaded", async (e) => {
  try {
    activatePremium();

    while (expenseList.hasChildNodes())
      expenseList.removeChild(expenseList.firstChild);
    const result = await axios.get(expenseBaseUrl);
    const expenses = result.data;
    for (const expense of expenses) addExpenseListItemToUI(expense);

    //doing above thing for leaderboard list
    while (leaderBoardList.hasChildNodes())
      leaderBoardList.removeChild(leaderBoardList.firstChild);
    const result2 = await axios.get(leaderboardUrl);
    const leaderBoardObjList = result2.data;
    // console.log(result2);
    for (const leaderBoardObj of leaderBoardObjList)
      addLeaderBoardListItemToUI(leaderBoardObj);
  } catch (error) {
    console.log(error);
    alert(error.response.statusText);
  }
});

function addLeaderBoardListItemToUI(leaderBoardObj) {
  const { username, totalExpense } = leaderBoardObj;
  const newListItem = leaderBoardListItem.cloneNode(true);
  newListItem.removeAttribute("id");

  newListItem.textContent = `Name : ${username} Total Expenses : ${totalExpense}`;
  leaderBoardList.append(newListItem);
}

function addExpenseListItemToUI(expenseObj) {
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
    addExpenseListItemToUI(addedExpenseObj.data);
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
        localStorage.setItem("token", result.data.token);
        activatePremium();
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
});

leaderboardBtn.addEventListener("click", (e) => {
  if (expenseList.style.display === "none") {
    expenseList.style.display = "block";
    leaderBoardList.style.display = "none";
    listTitle.textContent = "Expenses List :";
  } else {
    expenseList.style.display = "none";
    leaderBoardList.style.display = "block";
    listTitle.textContent = "Leaderboard :";
  }
});

filterByDateBtn.addEventListener("click", (e) => {
  isFilterVisible = !isFilterVisible;
  filterByDateForm.style.display = isFilterVisible ? "flex" : "none";
});

filterByDateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(filterByDateForm);
  const userData = {};
  for (const [name, value] of formData.entries()) userData[name] = value;
  console.log(userData);
});
