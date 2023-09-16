const Expense = require("../models/expense");
const database = require("../db/database");
const s3Services = require("../services/s3Services");

const ITEMS_PER_PAGE = 5;

exports.getAllExpenses = async (req, res, next) => {
  const transaction = await database.transaction();
  let pageNo = +req.query.pageNo;
  if (pageNo && pageNo <= 0) pageNo = 1;
  try {
    const totalExpenses = await Expense.count(
      {
        where: { userId: req.user.id },
      },
      transaction
    );
    const expenses = await req.user.getExpenses(
      {
        offset: (pageNo - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      },
      { transaction }
    );
    // console.log(totalExpenses, expenses.length);
    res.statusMessage = "Expense Retrieved Successfully";
    res.status(200).json({
      expenses,
      currentPage: pageNo,
      hasNextPage: pageNo * ITEMS_PER_PAGE < totalExpenses,
      hasPrevPage: pageNo > 1,
      nextPage: pageNo + 1,
      prevPage: pageNo - 1,
      lastPage: Math.ceil(totalExpenses / ITEMS_PER_PAGE),
    });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
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
  const transaction = await database.transaction();
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

exports.downloadExpense = async (req, res, next) => {
  if (!req.user.isPremium) {
    throw new Error("Not a premium User");
  }
  const transaction = await database.transaction();
  try {
    const expenses = await req.user.getExpenses(transaction);
    // console.log(expenses);
    if (!expenses) throw Error("Failed to get Expenses");
    const stringifiedExpenses = JSON.stringify(expenses);
    const filename = `Expense-${req.user.username}-${new Date()}.txt`;
    const fileInfo = await s3Services.uploadToS3(stringifiedExpenses, filename);
    const filesDownloadedRow = await req.user.createFilesDownloaded(
      {
        fileUrl: fileInfo.Location,
      },
      { transaction }
    );
    await transaction.commit();
    console.log(filesDownloadedRow);
    res.status(201).json({ fileUrl: fileInfo.Location, success: true });
  } catch (error) {
    await transaction.rollback();
    console.log("Error while uploading expense to aws", err);
    res.status(401).json(err);
  }
};

exports.allDownloadedExpenses = async (req, res, next) => {
  try {
    const filesDownloaded = await req.user.getFilesDownloadeds();
    console.log(filesDownloaded);
    res.status(201).json(filesDownloaded);
  } catch (err) {
    console.log("Error while retrieving all downloaded expenses", err);
    res.status(401).json(err);
  }
};
