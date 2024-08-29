import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import { uploadRouter } from "./routes";

export const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send("Web server is live");
});
app.use("/uploads", uploadRouter);
