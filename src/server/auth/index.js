import express from "express";
import ViteExpress from "vite-express";
import { createUser } from "../../db/users.js";
import bcrypt from "bcryptjs";
import pkg from 'jsonwebtoken';
const { jwt } = pkg;


const router = express.Router();

// Define routes
// /auth/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const SALT_ROUNDS = 5;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  try {
    console.log(req.body)
        const user = await createUser(username, hashedPassword);
        res.status(201).send(user);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {});

export default router;
