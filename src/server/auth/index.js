import express from "express";
import ViteExpress from "vite-express";
import { createUser } from "../../db/users.js";


const router = express.Router();

// Define routes
// /auth/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log(req.body)
        const user = await createUser(username, password);
        res.status(201).send(user);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {});

export default router;
