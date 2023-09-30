"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroupMessages = exports.addGroupMessageHandler = exports.getMessages = exports.addMessageHandler = void 0;
const sequelize_1 = require("sequelize");
const Message_1 = __importDefault(require("../models/Message"));
const app_1 = require("../app");
const helper_1 = require("../utils/helper");
const Group_1 = __importDefault(require("../models/Group"));
function addMessageHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { messageText, receiverId, } = req.body;
            //this req.file property is with the help of multer
            let originalname = null;
            let location = null;
            if (req.file) {
                originalname = req.file.originalname;
                location = req.file.location;
            }
            // console.log("file details:", req.file);
            const newMessage = yield req.user.createMessage({
                messageText,
                receiverId,
                fileName: originalname,
                fileUrl: location,
            });
            res.status(200).json(newMessage);
            //alert receiver using their unique room id
            const receiverRoomId = (0, helper_1.makeUniqueRoomId)(receiverId, false);
            app_1.io.to(receiverRoomId).emit("new-message", { userId: req.user.id });
        }
        catch (error) {
            console.log(error);
            res.status(400).json(error.message);
        }
    });
}
exports.addMessageHandler = addMessageHandler;
function getMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { receiverId } = req.body;
            let lastMessageId = +req.params.lastMessageId; //converting to number using +
            if (!lastMessageId)
                lastMessageId = 0;
            const sentMessages = yield Message_1.default.findAll({
                where: {
                    userId: req.user.id,
                    receiverId: receiverId,
                    id: {
                        [sequelize_1.Op.gt]: lastMessageId,
                    },
                },
            });
            // console.log("sent ", sentMessages);
            let receivedMessages = [];
            //if below condition is true that means we are not sending messages to self
            //cause if we are then there are no received messages
            //so if not checked we will send same data in sent and received messages
            if (receiverId !== req.user.id)
                receivedMessages = yield Message_1.default.findAll({
                    where: {
                        userId: receiverId,
                        receiverId: req.user.id,
                        id: {
                            [sequelize_1.Op.gt]: lastMessageId,
                        },
                    },
                });
            // console.log("received ", receivedMessages);
            res.status(200).json({ sentMessages, receivedMessages });
        }
        catch (error) {
            console.log(error);
            res.status(400).json(error.message);
        }
    });
}
exports.getMessages = getMessages;
function addGroupMessageHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { messageText, groupId } = req.body;
            let originalname = null;
            let location = null;
            if (req.file) {
                originalname = req.file.originalname;
                location = req.file.location;
            }
            // console.log("file details", req.file);
            const newMessage = yield req.user.createMessage({
                messageText,
                groupId,
                fileName: originalname,
                fileUrl: location,
            });
            res.status(200).json(newMessage);
            //alert group using their unique room id
            const group = yield Group_1.default.findByPk(groupId);
            const groupRoomId = (0, helper_1.makeUniqueRoomId)(groupId, true);
            console.log("groupRoomId", groupRoomId);
            app_1.io.to(groupRoomId).emit("new-message", { userId: req.user.id });
        }
        catch (error) {
            console.log(error);
            res.status(400).json(error.message);
        }
    });
}
exports.addGroupMessageHandler = addGroupMessageHandler;
function getGroupMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { groupId } = req.body;
            let lastMessageId = +req.params.lastMessageId; //converting to number using +
            if (!lastMessageId)
                lastMessageId = 0;
            const sentMessages = yield Message_1.default.findAll({
                where: {
                    userId: req.user.id,
                    groupId: groupId,
                    id: {
                        [sequelize_1.Op.gt]: lastMessageId,
                    },
                },
            });
            // console.log("sent ", sentMessages);
            const receivedMessages = yield Message_1.default.findAll({
                where: {
                    userId: { [sequelize_1.Op.ne]: req.user.id },
                    groupId: groupId,
                    id: {
                        [sequelize_1.Op.gt]: lastMessageId,
                    },
                },
            });
            // console.log("received ", receivedMessages);
            res.status(200).json({ sentMessages, receivedMessages });
        }
        catch (error) {
            console.log(error);
            res.status(400).json(error.message);
        }
    });
}
exports.getGroupMessages = getGroupMessages;
