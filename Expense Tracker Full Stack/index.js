var amount = document.querySelector("#amount");
var activity = document.querySelector("#activity");
var submitButton = document.querySelector("#add");
var dropdownItems = document.querySelectorAll(".dropdown-item");
var myForm = document.querySelector("#my-form");
var dropdown = document.querySelector("#dropdown");
var expenseList = document.querySelector("#expense-list");
const baseUrl = "http://localhost:3000/admin/";
//code for selecting dropdown item
let editID = null;
document.addEventListener("DOMContentLoaded", async () => {
  const expensesResult = await axios.get(baseUrl);
  const expenses = expensesResult.data;
  for (const obj of expenses) addItemToUI(obj, obj.id);
});

dropdownItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    let text = item.textContent;
    console.log(text);
    dropdown.textContent = text;
  });
});

myForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log(` ${amount.value} ${activity.value} ${dropdown.textContent}`);
  var expenseObj = {
    amount: amount.value,
    activity: activity.value,
    category: dropdown.textContent,
  };

  // localStorage.setItem(str, JSON.stringify(expenseObj));
  let expenseId = null;
  if (editID == null) {
    const addResult = await axios.post(baseUrl + "add", { ...expenseObj });
    console.log(addResult.data);
    expenseId = addResult.data.id;
  }else{
    const editResult = await axios.post(baseUrl + "edit", { ...expenseObj,id:editID });
    console.log(editResult.data);
    expenseId = editResult.data.id;
  }
  addItemToUI(expenseObj, expenseId);
});

async function addItemToUI(expenseObj, expenseId) {
  let str = `${expenseObj.amount}₹ - ${expenseObj.activity} - ${expenseObj.category}`;
  //cloning and creating new list element from hidden template i created in html
  var listItem = document.getElementById("mylist-item").cloneNode(true);
  listItem.style.display = "";
  listItem.firstChild.textContent = str;
  expenseList.append(listItem);

  listItem.addEventListener("click", async (e) => {
    console.log("entry");
    // let key = listItem.firstChild.textContent;
    if (e.target.classList.contains("delete")) {
      // localStorage.removeItem(key);
      const deleteResult = await axios.post(baseUrl + "delete", {
        id: expenseId,
      });
      console.log(deleteResult.data + "hey");
      // console.log(e.target+" "+e.target.parentNode);
      e.target.parentNode.remove();
      console.log("deleted");
    }
    if (e.target.classList.contains("edit")) {
      // let obj = JSON.parse(localStorage.getItem(key));
      const getExpense = await axios.get(
        baseUrl + "getSingleUser?id=" + expenseId
      );
      const obj = getExpense.data;
      console.log(obj);
      const listItem = e.target.parentNode;
      amount.value = obj.amount;
      activity.value = obj.activity;
      dropdown.textContent = obj.category;
      listItem.remove();
      submitButton.value = "Edit";
      editID = expenseId;
      // console.log("edited");
    }
  });
}
