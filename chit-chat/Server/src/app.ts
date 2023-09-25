import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import path from "path";


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

app.use("/auth", authRoutes);
app.use("/message", messageRoutes);
app.use("/group", groupRoutes);

User.hasMany(Message);
Group.hasMany(Message);
User.belongsToMany(Group, { through: GroupUser });
Group.belongsToMany(User, { through: GroupUser });

database
  .sync()
  .then(() => app.listen(process.env.PORT || 4000))
  .catch((err) => console.log(err));
