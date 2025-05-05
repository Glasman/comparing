import express from "express";
const router = express.Router();

router.get("/test", (req, res) => {
    res.send("API route for items is working!");
  });

export default router;