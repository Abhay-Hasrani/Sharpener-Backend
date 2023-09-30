"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../db/database"));
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const Group = database_1.default.define("groups", {
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    groupName: {
        type: sequelize_2.STRING,
        allowNull: false,
    },
});
exports.default = Group;
