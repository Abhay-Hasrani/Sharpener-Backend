const express = require("express");

const expenseController = require("../controllers/expense");

const router = express.Router();

router.get("/", expenseController.getAllExpenses);

router.post("/add-expense", expenseController.postAddExpense);

router.delete("/delete-expense/:expenseID", expenseController.deleteExpense);

module.exports = router;
