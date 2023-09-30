import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import http from "http";
import { Server } from "socket.io";
//below import is neccesary to configure multer before using it from serives folder
import upload from "./services/multer_AWS_S3";
//database instance
import database from "./db/database";

//routes
import authRoutes from "./routes/auth";
import messageRoutes from "./routes/message";
import groupRoutes from "./routes/group";

//models
import User from "./models/User";
import Message from "./models/Message";
import Group from "./models/Group";
import GroupUser from "./models/GroupUser";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

//configure socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  console.log("connected with ===", socket.id);
  const roomId = socket.handshake.query.roomId;
  console.log("roomId is ", roomId);
  socket.join(roomId as string);
  io.on("disconnect", (socket) => {
    console.log("disconnected with XXX", socket.id);
  });
  socket.on("join-group-room", (roomId, acknowledge) => {
    socket.join(roomId);
    // console.log("group roomId is ", roomId);
    acknowledge("Joined group with roomId " + roomId);
  });
});

app.use("/auth", authRoutes);
app.use("/message", messageRoutes);
app.use("/group", groupRoutes);

User.hasMany(Message);
Group.hasMany(Message);
User.belongsToMany(Group, { through: GroupUser });
Group.belongsToMany(User, { through: GroupUser });

database
  .sync()
  .then(() => server.listen(process.env.PORT || 4000))
  .catch((err) => console.log(err));

export { io };
