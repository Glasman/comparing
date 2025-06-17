import express from "express";
const router = express.Router();
import { getAllUsers, getUserByID } from "../../db/users.js";

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
