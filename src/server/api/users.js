import express from "express";
import jwt from "jsonwebtoken";
import { getAllUsers, getUserByID } from "../../db/users.js";

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

// /api/users/me
router.get("/me", async (req, res) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.send({ user: "notLoggedIn" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.send({ user: "notLoggedIn" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.send({ user: "loggedIn" });
    
  } catch (error) {
    console.error(error.stack);
    res.status(401).send({ message: "error:", error });
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
