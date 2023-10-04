const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const forgotPasswordSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    isActive: { type: Boolean, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ForgotPassword", forgotPasswordSchema);

// const { Sequelize } = require("sequelize");

// const database = require("../db/database");

// const ForgotPassword = database.define("forgotPasswordRequests", {
//   id: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     primaryKey: true,
//   },
//   isActive: { type: Sequelize.BOOLEAN, allowNull: false },
// });

// module.exports = ForgotPassword;
