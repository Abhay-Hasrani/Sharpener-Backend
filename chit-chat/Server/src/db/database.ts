import { Sequelize } from "sequelize";
const database = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.DATABASE_USERNAME as string,
  process.env.DATABASE_PASSWORD as string,
  {
    dialect: "mysql",
    host: process.env.DATABASE_HOST as string,
  }
);

export default database;
