import express from "express";
const router = express.Router();

// Define routes
router.get("/test", (req, res) => {
  res.send("API route is working!");
});

export default router;
