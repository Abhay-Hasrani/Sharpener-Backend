"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../db/database"));
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const Message = database_1.default.define("messages", {
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    receiverId: {
        type: sequelize_1.INTEGER,
    },
    messageText: {
        type: sequelize_2.STRING,
        allowNull: false,
    },
    fileName: {
        type: sequelize_2.TEXT,
    },
    fileUrl: {
        type: sequelize_2.TEXT,
    },
});
exports.default = Message;
