const { Sequelize } = require("sequelize");

const database = require("../db/database");

const ForgotPassword = database.define("forgotPasswordRequests", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  isActive: { type: Sequelize.BOOLEAN, allowNull: false },
});

module.exports = ForgotPassword;
