import "dotenv/config";
import express from "express";
import ViteExpress from "vite-express";
import apiRouter from "./api/index.js";
import authRouter from "./auth/index.js";
import { createUser } from "../db/users.js";

const app = express();

// This line is necessary to parse JSON bodies
app.use(express.json());

app.use("/api", apiRouter);
app.use("/auth", authRouter);

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
