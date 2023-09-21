import express from "express";
import bodyParser from "body-parser";
import todoRoutes from "./routers/todos";

const app = express();

app.use(bodyParser.json());

app.use(todoRoutes);

app.listen(3000);
