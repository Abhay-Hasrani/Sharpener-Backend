"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
//database instance
const database_1 = __importDefault(require("./db/database"));
//routes
const auth_1 = __importDefault(require("./routes/auth"));
const message_1 = __importDefault(require("./routes/message"));
const group_1 = __importDefault(require("./routes/group"));
//models
const User_1 = __importDefault(require("./models/User"));
const Message_1 = __importDefault(require("./models/Message"));
const Group_1 = __importDefault(require("./models/Group"));
const GroupUser_1 = __importDefault(require("./models/GroupUser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
//configure socket.io
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
    },
});
exports.io = io;
io.on("connection", (socket) => {
    console.log("connected with ===", socket.id);
    const roomId = socket.handshake.query.roomId;
    console.log("roomId is ", roomId);
    socket.join(roomId);
    io.on("disconnect", (socket) => {
        console.log("disconnected with XXX", socket.id);
    });
    socket.on("join-group-room", (roomId, acknowledge) => {
        socket.join(roomId);
        // console.log("group roomId is ", roomId);
        acknowledge("Joined group with roomId " + roomId);
    });
});
app.use("/auth", auth_1.default);
app.use("/message", message_1.default);
app.use("/group", group_1.default);
User_1.default.hasMany(Message_1.default);
Group_1.default.hasMany(Message_1.default);
User_1.default.belongsToMany(Group_1.default, { through: GroupUser_1.default });
Group_1.default.belongsToMany(User_1.default, { through: GroupUser_1.default });
database_1.default
    .sync()
    .then(() => server.listen(process.env.PORT || 4000))
    .catch((err) => console.log(err));
