const Sequelize = require("sequelize");

const sequelize = new Sequelize("sharpener_test", "root", "MySQL@333", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
