import express from "express";
import ViteExpress from "vite-express";

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

app.get("/createUser", (req, res) => {
  res.send({ value: "making user" });
  console.log("the http get request is hitting the API");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
