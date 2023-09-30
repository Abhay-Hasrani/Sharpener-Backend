"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const message_1 = require("../controllers/message");
const multer_AWS_S3_1 = __importDefault(require("../services/multer_AWS_S3"));
const router = (0, express_1.Router)();
// router.use("/", authenticateToken);
router.post("/add-message", authenticateToken_1.default, multer_AWS_S3_1.default.single("userFile"), message_1.addMessageHandler);
router.post("/get-messages/:lastMessageId", authenticateToken_1.default, message_1.getMessages);
router.post("/add-group-message", authenticateToken_1.default, multer_AWS_S3_1.default.single("userFile"), message_1.addGroupMessageHandler);
router.post("/get-group-messages/:lastMessageId", authenticateToken_1.default, message_1.getGroupMessages);
exports.default = router;
