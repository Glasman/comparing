import express from "express";
import ViteExpress from "vite-express";
import apiRouter from "./api/index.js";
import { createUser } from "../db/users.js";

const app = express();

// This line is necessary to parse JSON bodies
app.use(express.json());


app.use("/api", apiRouter)

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

app.post("/createUser", (req, res) => {
  res.send({ value: "making user" });
  console.log("the http get request is hitting the API");
});

app.post("/getUser", (req, res) => {
  console.log({value: req.body});
  res.send({ value: "checking user" });
  console.log("the http get request is hitting the API");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
