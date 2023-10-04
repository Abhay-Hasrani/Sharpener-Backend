const { Sequelize } = require("sequelize");
const User = require("../models/user");
const Expense = require("../models/expense");

exports.getLeaderBoard = async (req, res, next) => {
  try {
    // const result = await User.findAll({
    //   attributes: ["id","username",[Sequelize.fn("SUM", Sequelize.col("amount")), "totalSum"]],
    //   include: [
    //     {
    //       model: Expense,
    //       attributes: [

    //       ],
    //     },
    //   ],
    //   group: ["username"],
    //   order: Sequelize.literal('totalSum DESC'),
    // });
    // used above default left outer join first but then included the total amount colum to users table

    // const result = await User.findAll({
    //   attributes: ["id", "username", "totalExpense"],
    //   order: [["totalExpense", "desc"]],
    // });

    const result = await User.find()
      .select("_id username totalExpense")
      .sort({ totalExpense: -1 }) //use 1 for ascending order
      .exec();
    // console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.statusMessage = "Error while Retrieving expense";
    res.status(400).json({ message: err.message });
  }
};
