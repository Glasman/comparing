import express from "express";
const router = express.Router();
import { getAllItems, getItemByID, createItem, getApprovedItems } from "../../db/items.js";
import verifyToken from "../util.js";

// /api/items/
  router.get("/", async (req, res) => {
    try {
      console.log("GET /api/items route hit");
      const items = await getAllItems();
      res.status(200).send(items);
    } catch (error) {
      console.error("Failed to get items:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // /api/items/approved/
  router.get("/approved", async (req, res) => {
    try {
      console.log("GET /api/items/approved route hit");
      const items = await getApprovedItems();
      res.status(200).send(items);
    } catch (error) {
      console.error("Failed to get items:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const item = await getItemByID(id);
      res.status(200).send(item);
    } catch (error) {
      console.error("Failed to get item:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post("/", verifyToken, async (req, res) => {
    try {
      const {name, image_url, description, category} = req.body;
      const user_id = req.user.id;
      // const newItem = await createItem(name, image_url, description, category, user_id)
      //default admin_approved value is false so that all submitted items will be false until admin approves them
      const newItem = await createItem(name, image_url, description, category, user_id, false)
      console.log(newItem)
      console.log(req.body)
      res.status(201).send(newItem);
    } catch (error) {
      console.error("Failed to post item:", error);
      res.status(500).json({ error: "Internal Server Error, failed to post" });
    }
  })
  

export default router;