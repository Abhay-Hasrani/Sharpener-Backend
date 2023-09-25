import database from "../db/database";
import { BOOLEAN } from "sequelize";

const GroupUser = database.define("groupUsers", {
  isAdmin: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export default GroupUser;
