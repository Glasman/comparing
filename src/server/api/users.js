import express from "express";
const router = express.Router();

router.get("/test", (req, res) => {
    res.send("API route for users is working!");
  });

export default router;