const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps:true }
);

module.exports = mongoose.model("Expense", expenseSchema);

// const { Sequelize } = require("sequelize");

// const database = require("../db/database");

// const Expense = database.define("expenses", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   amount: {
//     type: Sequelize.DOUBLE,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.TEXT,
//     allowNull: false,
//   },
//   category: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// module.exports = Expense;
