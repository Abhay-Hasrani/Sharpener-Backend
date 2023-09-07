const express = require("express");

const expenseController = require("../controllers/expense");
const userAuthentication = require("../middlewares/auth");

const router = express.Router();

router.get("/", userAuthentication.authenticate , expenseController.getAllExpenses);

router.post("/add-expense", userAuthentication.authenticate ,expenseController.postAddExpense);

router.delete("/delete-expense/:expenseID", userAuthentication.authenticate , expenseController.deleteExpense);

module.exports = router;
