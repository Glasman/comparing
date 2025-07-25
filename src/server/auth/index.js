import express from "express";
import ViteExpress from "vite-express";
import { createUser, getUser, getUserByUsername } from "../../db/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import pkg from "jsonwebtoken";
// const { jwt } = pkg;

const router = express.Router();

// Define routes
// /auth/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const SALT_ROUNDS = 5;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const existingUser = await getUserByUsername(username, password);
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Username already taken (case-sensitive)" });
    }
    const user = await createUser(username, hashedPassword);
    const token = jwt.sign(
      { id: user.id, username: user.username, is_admin: user.is_admin },
      process.env.JWT_SECRET
    );
    res.status(201).send({ token });
  } catch (error) {
    console.error(error);
  }
});

// /auth/login
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await getUser(username, password);
    res.status(200).send({ token });
  } catch (error) {
    console.error(error);
  }
});

export default router;
