import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import authRoutes from "./routes/auth";
import database from "./db/database";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRoutes);

database
  .sync()
  .then(() => app.listen(process.env.PORT || 4000))
  .catch((err) => console.log(err));
