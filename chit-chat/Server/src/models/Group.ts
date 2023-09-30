import database from "../db/database";
import { INTEGER } from "sequelize";
import { STRING } from "sequelize";

const Group = database.define("groups", {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  groupName: {
    type: STRING,
    allowNull: false,
  },
});

export default Group;
