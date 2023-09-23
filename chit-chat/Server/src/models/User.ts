import database from "../db/database";
import { INTEGER } from "sequelize";
import { STRING } from "sequelize";

const User = database.define("users", {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  mob_number: {
    type: STRING(10),
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
});

export default User;
