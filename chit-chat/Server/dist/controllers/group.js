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
exports.removeUsersFromGroup = exports.addUsersToGroup = exports.makeGroupAdmins = exports.getAllGroups = exports.createGroup = void 0;
const database_1 = __importDefault(require("../db/database"));
const Group_1 = __importDefault(require("../models/Group"));
const GroupUser_1 = __importDefault(require("../models/GroupUser"));
const app_1 = require("../app");
const helper_1 = require("../utils/helper");
function createGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = yield database_1.default.transaction();
        try {
            const { groupName, groupUsers } = req.body;
            // console.log(groupName, groupUsers);
            //create group with name
            const newGroup = yield Group_1.default.create({ groupName }, { transaction });
            //add creator as admin first
            const addGroupCreator = yield newGroup.addUser(req.user, {
                through: { isAdmin: true },
                transaction,
            });
            //add other members of group here gorup users should be array of ids of users
            //id of creator is added in this first brcause setUsers is Overriding addUser
            //but adding creator id solves problem
            groupUsers.push(req.user.id);
            const groupMembers = yield newGroup.setUsers(groupUsers, { transaction });
            res.status(200).json(groupMembers);
            //alert all members about new group
            const roomIds = groupUsers.map((id) => (0, helper_1.makeUniqueRoomId)(id, false));
            console.log(roomIds);
            app_1.io.to(roomIds).emit("new-group", `you were added to ${groupName} by ${req.user.username}`);
            yield transaction.commit();
        }
        catch (error) {
            yield transaction.rollback();
            console.log(error);
            res.status(400).json(error.message);
        }
    });
}
exports.createGroup = createGroup;
function getAllGroups(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const groups = yield req.user.getGroups();
            const allGroups = yield Promise.all(groups.map((group) => __awaiter(this, void 0, void 0, function* () {
                let users = yield group.getUsers();
                users = users.map((user) => ({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    mob_number: user.mob_number,
                    isAdmin: user.groupUsers.isAdmin,
                }));
                group.dataValues.users = users;
                return group;
            })));
            // console.log(allGroups);
            res.status(200).json(allGroups);
        }
        catch (error) {
            console.log(error);
            res.status(400).json(error.message);
        }
    });
}
exports.getAllGroups = getAllGroups;
function makeGroupAdmins(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { groupId, userIds } = req.body;
            const groupUserRow = yield GroupUser_1.default.findOne({
                where: {
                    userId: req.user.id,
                    groupId: groupId,
                },
            });
            if (!groupUserRow.isAdmin)
                throw new Error("Doesn't have admin access");
            const updatedRows = [];
            for (const userId of userIds) {
                const row = yield GroupUser_1.default.update({ isAdmin: true }, {
                    where: {
                        userId: userId,
                        groupId: groupId,
                    },
                });
                console.log(row);
                updatedRows.push(row);
            }
            res.status(200).json("Users successfully upgraded to admins");
        }
        catch (error) {
            console.log(error);
            res.status(400).json(error.message);
        }
    });
}
exports.makeGroupAdmins = makeGroupAdmins;
function addUsersToGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { groupId, userIds } = req.body;
            const group = yield Group_1.default.findByPk(groupId);
            for (const userId of userIds) {
                const row = yield group.addUser(userId, { through: { isAdmin: false } });
            }
            res.status(200).json(`Users add to ${group.groupName} successfully`);
        }
        catch (error) {
            console.log(error);
            res.status(400).json(error.message);
        }
    });
}
exports.addUsersToGroup = addUsersToGroup;
function removeUsersFromGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { groupId, userIds } = req.body;
            const group = yield Group_1.default.findByPk(groupId);
            for (const userId of userIds) {
                const row = yield group.removeUser(userId);
            }
            res.status(200).json(`Users removed from ${group.groupName} successfully`);
        }
        catch (error) {
            console.log(error);
            res.status(400).json(error.message);
        }
    });
}
exports.removeUsersFromGroup = removeUsersFromGroup;
