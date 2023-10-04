const Expense = require("../models/expense");
const s3Services = require("../services/s3Services");
const mongoose = require("mongoose");
const FilesDownload = require("../models/filesDownloaded");

exports.getAllExpenses = async (req, res, next) => {
  // const transaction = await database.transaction();
  const session = await mongoose.startSession();
  session.startTransaction();
  const ITEMS_PER_PAGE = +req.query.pageItems || 5;
  let pageNo = +req.query.pageNo;
  if (pageNo && pageNo <= 0) pageNo = 1;
  try {
    // const totalExpenses = await Expense.count(
    //   {
    //     where: { userId: req.user.id },
    //   },
    //   transaction
    // );
    const totalExpenses = await Expense.countDocuments({
      userId: req.user,
    }).session(session);

    const offset = (pageNo - 1) * ITEMS_PER_PAGE;
    const limit = ITEMS_PER_PAGE;
    // const expenses = await req.user.getExpenses(
    //   {
    //     offset,
    //     limit,
    //   },
    //   { transaction }
    // );
    const expenses = await Expense.find({ userId: req.user })
      .skip(offset)
      .limit(limit)
      .session(session)
      .exec();
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
    await session.commitTransaction();
    // await transaction.commit();
  } catch (err) {
    // await transaction.rollback();
    await session.abortTransaction();
    console.log(err);
    res.statusMessage = "Error while Retrieving expense";
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
};

exports.postAddExpense = async (req, res, next) => {
  // const transaction = await database.transaction();
  const session = await mongoose.startSession();
  session.startTransaction();
  const expenseObj = req.body;
  const amount = expenseObj.amount;
  const description = expenseObj.description;
  const category = expenseObj.category;

  try {
    // const newExpense = await req.user.createExpense(
    //   {
    //     amount,
    //     description,
    //     category,
    //   },
    //   { transaction }
    // );
    const newExpenseArr = await Expense.create(
      [
        {
          amount,
          description,
          category,
          userId: req.user,
        },
      ],
      { session }
    );
    const newExpense = newExpenseArr[0];
    // const updateTotalExpense = await req.user.update(
    //   {
    //     totalExpense: req.user.totalExpense + +amount,
    //   },
    //   { transaction }
    // );
    req.user.totalExpense += +amount;
    const updateTotalExpense = await req.user.save({ session });
    res.statusMessage = "Expense Added Successfully";
    // console.log(newExpense);
    res.status(201).json(newExpense);
    await session.commitTransaction();
    // await transaction.commit();
  } catch (err) {
    // await transaction.rollback();
    await session.abortTransaction();
    res.statusMessage = "Error while adding expense";
    res.status(401).json({ message: "Expense could not be added" });
  } finally {
    session.endSession();
  }
};

exports.deleteExpense = async (req, res, next) => {
  // const transaction = await database.transaction();
  const session = await mongoose.startSession();
  session.startTransaction();
  const expenseID = req.params.expenseID;
  try {
    const requireExpense = await Expense.findById(expenseID)
      .session(session)
      .exec();

    const deletedExpense = await Expense.findByIdAndDelete(expenseID, {
      session,
    });

    // const deletedExpense = await req.user.removeExpense(expenseID, {
    //   transaction,
    // });

    // const updateTotalExpense = await req.user.update(
    //   {
    //     totalExpense: req.user.totalExpense - +requireExpense.amount,
    //   },
    //   { transaction }
    // );
    req.user.totalExpense -= +requireExpense.amount;
    const updateTotalExpense = await req.user.save({ session });

    // deletedExpense is either 0 or 1
    if (!deletedExpense)
      throw new Error("Expense is not present or already deleted");
    res.statusMessage = "Expense Deleted Successfully";
    res.status(202).json({ message: "Expense is Deleted" });
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    res.statusMessage = "Error while deleting expense";
    res.status(402).json({ message: err.message });
  } finally {
    session.endSession();
  }
};

exports.downloadExpense = async (req, res, next) => {
  if (!req.user.isPremium) {
    throw new Error("Not a premium User");
  }
  // const transaction = await database.transaction();
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // const expenses = await req.user.getExpenses(transaction);
    const expenses = await Expense.find({ userId: req.user });
    // console.log(expenses);
    if (!expenses) throw Error("Failed to get Expenses");

    const stringifiedExpenses = JSON.stringify(expenses);
    const filename = `Expense-${req.user.username}-${new Date()}.txt`;
    const fileInfo = await s3Services.uploadToS3(stringifiedExpenses, filename);

    const filesDownloadedRows = await FilesDownload.create(
      [
        {
          fileUrl: fileInfo.Location,
          userId: req.user,
        },
      ],
      { session }
    );
    const filesDownloadedRow = filesDownloadedRows[0];
    
    await session.commitTransaction();
    console.log(filesDownloadedRow);
    res.status(201).json({ fileUrl: fileInfo.Location, success: true });
  } catch (err) {
    await session.abortTransaction();
    console.log("Error while uploading expense to aws", err);
    res.status(401).json(err);
  } finally {
    session.endSession();
  }
};

exports.allDownloadedExpenses = async (req, res, next) => {
  try {
    const filesDownloaded = await FilesDownload.find().exec();
    console.log(filesDownloaded);
    res.status(201).json(filesDownloaded);
  } catch (err) {
    console.log("Error while retrieving all downloaded expenses", err);
    res.status(401).json(err);
  }
};
