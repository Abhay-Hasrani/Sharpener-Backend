const { Sequelize } = require("sequelize");

const database = require("../db/database");

const FilesDownloaded = database.define("filesDownloaded", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fileUrl: {
    type: Sequelize.TEXT,
  },
});

module.exports = FilesDownloaded;
