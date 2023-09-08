const { Sequelize } = require("sequelize");

const database = require("../db/database");

const Order = database.define("orders", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  orderID: Sequelize.STRING,
  paymentID: Sequelize.STRING,
  status: Sequelize.STRING,
});

module.exports = Order;
