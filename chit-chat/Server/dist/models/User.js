"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../db/database"));
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const User = database_1.default.define("users", {
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_2.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_2.STRING,
        allowNull: false,
        unique: true,
    },
    mob_number: {
        type: (0, sequelize_2.STRING)(10),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_2.STRING,
        allowNull: false,
    },
});
exports.default = User;
