"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const group_1 = require("../controllers/group");
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const router = (0, express_1.Router)();
router.post("/create-group", authenticateToken_1.default, group_1.createGroup);
router.get("/all-groups", authenticateToken_1.default, group_1.getAllGroups);
router.post("/make-admins", authenticateToken_1.default, group_1.makeGroupAdmins);
router.post("/add-users", authenticateToken_1.default, group_1.addUsersToGroup);
router.post("/remove-users", authenticateToken_1.default, group_1.removeUsersFromGroup);
exports.default = router;
