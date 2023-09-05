const { Sequelize } = require("sequelize");

const database = new Sequelize("sharpener_test", "root", "MySQL@333", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = database;
