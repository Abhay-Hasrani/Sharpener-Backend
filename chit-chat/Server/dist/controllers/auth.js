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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.authLogOutHanlder = exports.authLogInHanlder = exports.generateAccessToken = exports.authSignUpHanlder = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = require("../app");
function authSignUpHanlder(req, res) {
    const { username, mob_number, email, password, } = req.body;
    const saltRounds = 10;
    bcrypt_1.default.hash(password, saltRounds, (err, hash) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (err)
                throw new Error("Error while generating hash");
            else if (hash) {
                const newUser = yield User_1.default.create({
                    username,
                    email,
                    mob_number,
                    password: hash,
                });
                res.statusMessage = "User Registered and account created successfully";
                res.status(200).json(newUser);
            }
        }
        catch (error) {
            console.log(err);
            res.statusMessage =
                "E-mail or Mobile Number already exists. Please try again!!!";
            res.status(400).json(err);
        }
    }));
}
exports.authSignUpHanlder = authSignUpHanlder;
const generateAccessToken = (id) => {
    return jsonwebtoken_1.default.sign({ userID: id }, process.env.SECRET_AUTH_KEY);
};
exports.generateAccessToken = generateAccessToken;
function authLogInHanlder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield User_1.default.findOne({
                where: {
                    email: email,
                },
            });
            if (!user)
                throw new Error("User Not found");
            bcrypt_1.default.compare(password, user.password, (err, result) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (err)
                        throw new Error("Error in hash");
                    if (!result)
                        throw new Error("User Not Authorized!!!");
                    else {
                        const updatedUser = yield user.update({ isLogged: true });
                        const _a = updatedUser.dataValues, { password } = _a, otherData = __rest(_a, ["password"]);
                        res.status(200).json({
                            user: Object.assign({}, otherData),
                            token: (0, exports.generateAccessToken)(user.id),
                            message: "User Logged In successfully",
                        });
                        //alert for new user joined
                        app_1.io.emit("user joined", updatedUser.username + " is here");
                    }
                }
                catch (err) {
                    console.log(err.message);
                    res.status(400).json(err.message);
                }
            }));
        }
        catch (error) {
            console.log(error.message);
            res.status(400).json(error.message);
        }
    });
}
exports.authLogInHanlder = authLogInHanlder;
function authLogOutHanlder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentUser = req.user;
            const updatedUser = yield currentUser.update({ isLogged: false });
            res.status(200).json("Logged Out Successfully");
        }
        catch (error) {
            res.status(400).json("Error logging out");
        }
    });
}
exports.authLogOutHanlder = authLogOutHanlder;
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let allUsers = yield User_1.default.findAll();
            // console.log("all ", allUsers);
            allUsers = allUsers.map((user) => {
                const { id, isLogged, email, mob_number, createdAt, updatedAt, username, } = user;
                return {
                    id,
                    isLogged,
                    email,
                    mob_number,
                    createdAt,
                    updatedAt,
                    username,
                };
            });
            res.status(200).json(allUsers);
        }
        catch (error) {
            res.status(400).json("Error get all users out");
        }
    });
}
exports.getAllUsers = getAllUsers;
