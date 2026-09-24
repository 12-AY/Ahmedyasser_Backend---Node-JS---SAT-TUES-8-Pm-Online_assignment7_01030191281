import express from "express";
import * as logService from "./log.service.js";

const router = express.Router();

// Task 7: POST /logs - insert a new log { book_id, action }
router.post("/", async (req, res) => {
  try {
    if (!req.body.action) {
      return res.status(400).json({ error: "action is required" });
    }
    const result = await logService.insertLog(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
