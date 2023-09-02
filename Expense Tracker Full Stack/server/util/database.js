const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_complete", "root", "MySQL@333", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
