import database from "../db/database";
import { BOOLEAN } from "sequelize";
import { INTEGER } from "sequelize";
import { STRING, TEXT } from "sequelize";

const Message = database.define("messages", {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  receiverId: {
    type: INTEGER,
  },
  messageText: {
    type: STRING,
    allowNull: false,
  },
  fileName: {
    type: TEXT,
  },
  fileUrl: {
    type: TEXT,
  },
});

export default Message;
