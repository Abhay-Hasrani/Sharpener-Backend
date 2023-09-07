const expenseForm = document.getElementById("expense-form");
const expenseListItem = document.getElementById("expense-list-item");
const expenseList = document.getElementById("expense-list");

const baseUrl = "http://localhost:3000/expense/";
const addExpenseUrl = baseUrl + "add-expense";
const deleteExpenseUrl = baseUrl + "delete-expense/";

const AuthenticationToken = localStorage.getItem("token");
axios.defaults.headers.common['AuthenticationToken'] = AuthenticationToken;

document.addEventListener("DOMContentLoaded", async (e) => {
  try {
    while(expenseList.hasChildNodes()) expenseList.removeChild(expenseList.firstChild);
    const result = await axios.get(baseUrl);
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

  console.log(newListItem);
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
