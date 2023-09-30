"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../db/database"));
const sequelize_1 = require("sequelize");
const GroupUser = database_1.default.define("groupUsers", {
    isAdmin: {
        type: sequelize_1.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});
exports.default = GroupUser;
