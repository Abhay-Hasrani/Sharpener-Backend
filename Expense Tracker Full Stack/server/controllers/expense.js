const Expense = require("../models/expense");
const database = require("../db/database");

exports.getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await req.user.getExpenses();
    res.statusMessage = "Expense Retrieved Successfully";
    res.status(200).json(expenses);
  } catch (err) {
    console.log(err);
    res.statusMessage = "Error while Retrieving expense";
    res.status(400).json({ message: err.message });
  }
};

exports.postAddExpense = async (req, res, next) => {
  const transaction = await database.transaction();
  const expenseObj = req.body;
  const amount = expenseObj.amount;
  const description = expenseObj.description;
  const category = expenseObj.category;

  try {
    const newExpense = await req.user.createExpense(
      {
        amount,
        description,
        category,
      },
      { transaction }
    );
    const updateTotalExpense = await req.user.update(
      {
        totalExpense: req.user.totalExpense + +amount,
      },
      { transaction }
    );
    res.statusMessage = "Expense Added Successfully";
    // console.log(newExpense);
    res.status(201).json(newExpense);
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    res.statusMessage = "Error while adding expense";
    res.status(401).json({ message: "Expense could not be added" });
  }
};

exports.deleteExpense = async (req, res, next) => {
  const expenseID = req.params.expenseID;
  try {
    const requireExpense = await Expense.findByPk(expenseID, { transaction });
    const deletedExpense = await req.user.removeExpense(expenseID, {
      transaction,
    });
    // deletedExpense is either 0 or 1
    const updateTotalExpense = await req.user.update(
      {
        totalExpense: req.user.totalExpense - +requireExpense.amount,
      },
      { transaction }
    );
    if (!deletedExpense)
      throw new Error("Expense is not present or already deleted");
    res.statusMessage = "Expense Deleted Successfully";
    res.status(202).json({ message: "Expense is Deleted" });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    res.statusMessage = "Error while deleting expense";
    res.status(402).json({ message: err.message });
  }
};
