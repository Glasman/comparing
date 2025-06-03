import express from "express";
import ViteExpress from "vite-express";
import usersRouter from "./users.js";
import itemsRouter from "./items.js";
const router = express.Router();

// Define routes
router.get("/test", (req, res) => {
  res.send("API route is working!");
});

router.use("/users", usersRouter);
router.use("/items", itemsRouter);

export default router;
