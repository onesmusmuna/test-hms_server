import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import router from "./router";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "/views"));

app.use(express.static(path.join(__dirname, "..", "/public")));

app.use(express.json());
app.use(cookieParser());

app.use(router);

export default app;
