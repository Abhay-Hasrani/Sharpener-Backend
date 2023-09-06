const Expense = require("../models/expense");

exports.getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll();
    res.statusMessage = "Expense Retrieved Successfully";
    res.status(200).json(expenses);
  } catch (err) {
    res.statusMessage = "Error while Retrieving expense";
    res.status(400).json({ message: err.message });
  }
};

exports.postAddExpense = async (req, res, next) => {
  const expenseObj = req.body;
  const amount = expenseObj.amount;
  const description = expenseObj.description;
  const category = expenseObj.category;
  try {
    const newExpense = await Expense.create({ amount, description, category });
    res.statusMessage = "Expense Added Successfully";
    console.log(newExpense);
    res.status(201).json(newExpense);
  } catch (err) {
    res.statusMessage = "Error while adding expense";
    res.status(401).json({ message: "Expense could not be added" });
  }
};

exports.deleteExpense = async (req, res, next) => {
  const expenseID = req.params.expenseID;
  try {
    const deletedExpense = await Expense.destroy({
      where: {
        id: expenseID,
      },
    });
    // deletedExpense is either 0 or 1
    if (!deletedExpense)
      throw new Error("Expense is not present or already deleted");
    res.statusMessage = "Expense Deleted Successfully";
    res.status(202).json({ message: "Expense is Deleted" });
  } catch (err) {
    res.statusMessage = "Error while deleting expense";
    res.status(402).json({ message: err.message });
  }
};
