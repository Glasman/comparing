import express from "express";
const router = express.Router();
import { getAllUsers } from "../../db/users.js";

// /api/users/
router.get("/", async (req, res) => {
  try {
    console.log("GET /api/users route hit");
    const users = await getAllUsers();
    console.log(users);
    res.json(users);
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
