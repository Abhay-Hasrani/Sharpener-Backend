"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const router = (0, express_1.Router)();
router.post("/signup", auth_1.authSignUpHanlder);
router.post("/login", auth_1.authLogInHanlder);
router.get("/logout", authenticateToken_1.default, auth_1.authLogOutHanlder);
router.get("/getAllUsers", authenticateToken_1.default, auth_1.getAllUsers);
exports.default = router;
