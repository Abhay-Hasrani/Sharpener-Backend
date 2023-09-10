const express = require("express");

const expenseController = require("../controllers/expense");
const userAuthentication = require("../middlewares/auth");

const router = express.Router();

router.get(
  "/",
  userAuthentication.authenticate,
  expenseController.getAllExpenses
);

router.post(
  "/add-expense",
  userAuthentication.authenticate,
  expenseController.postAddExpense
);

router.delete(
  "/delete-expense/:expenseID",
  userAuthentication.authenticate,
  expenseController.deleteExpense
);

router.get(
  "/download-expense",
  userAuthentication.authenticate,
  expenseController.downloadExpense
);

router.get(
  "/all-downloads-expenses",
  userAuthentication.authenticate,
  expenseController.allDownloadedExpenses
);

module.exports = router;
