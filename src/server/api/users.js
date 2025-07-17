import express from "express";
import jwt from "jsonwebtoken";
import { getAllUsers, getUserByID } from "../../db/users.js";
import verifyToken from "../util.js";

const router = express.Router();

// /api/users/
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await getUserByID(req.user.id);
    res.send({ user });
  } catch (error) {
    console.error(error.stack);
    res.status(401).send({ message: "Unauthorized" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserByID(id);
    res.status(200).send(user);
  } catch (error) {
    console.error("Failed to get user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
