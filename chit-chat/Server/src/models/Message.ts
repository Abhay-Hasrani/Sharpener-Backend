import database from "../db/database";
import { BOOLEAN } from "sequelize";
import { INTEGER } from "sequelize";
import { STRING } from "sequelize";

const Message = database.define("messages", {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  receiverId: {
    type: INTEGER,
    allowNull: false,
    defaultValue:1
  },
  messageText: {
    type: STRING,
    allowNull: false,
  },
});

export default Message;
