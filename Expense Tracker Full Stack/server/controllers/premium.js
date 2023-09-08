const { Sequelize } = require("sequelize");
const User = require("../models/user");
const Expense = require("../models/expense");

exports.getLeaderBoard = async (req, res, next) => {
  try {
    const result = await User.findAll({
      attributes: ["username",[Sequelize.fn("SUM", Sequelize.col("amount")), "totalSum"]],
      include: [
        {
          model: Expense,
          attributes: [
            
          ],
        },
      ],
      group: ["username"],
      order: Sequelize.literal('totalSum DESC'),
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.statusMessage = "Error while Retrieving expense";
    res.status(400).json({ message: err.message });
  }
};
