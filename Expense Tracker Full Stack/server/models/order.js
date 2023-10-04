const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderID: String,
  paymentID: String,
  status: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);

// const { Sequelize } = require("sequelize");

// const database = require("../db/database");

// const Order = database.define("orders", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   orderID: Sequelize.STRING,
//   paymentID: Sequelize.STRING,
//   status: Sequelize.STRING,
// });

// module.exports = Order;
