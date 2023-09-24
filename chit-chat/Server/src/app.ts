import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import path from "path";

import database from "./db/database";
import User from "./models/User";
import Message from "./models/Message";

import authRoutes from "./routes/auth";
import messageRoutes from "./routes/message";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRoutes);
app.use("/message", messageRoutes);

User.hasMany(Message);

database
  .sync()
  .then(() => app.listen(process.env.PORT || 4000))
  .catch((err) => console.log(err));
