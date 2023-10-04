const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filesDownloadSchema = new Schema(
  {
    fileUrl: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FilesDownload", filesDownloadSchema);

// const { Sequelize } = require("sequelize");

// const database = require("../db/database");

// const FilesDownloaded = database.define("filesDownloaded", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   fileUrl: {
//     type: Sequelize.TEXT,
//   },
// });

// module.exports = FilesDownloaded;
