const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    totalExpense: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

//Below snippet is for model to be used with MySQL
/*
const { Sequelize } = require("sequelize");

const database = require("../db/database");

const User = database.define("users", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isPremium: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  totalExpense: {
    type: Sequelize.DOUBLE,
    defaultValue: 0,
  },
});

module.exports = User;
*/
