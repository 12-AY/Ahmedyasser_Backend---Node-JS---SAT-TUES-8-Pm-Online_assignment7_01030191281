import express from "express";
import * as collectionService from "./collection.service.js";

const router = express.Router();

// Task 1: POST /collection/books - explicit collection with validation rule
router.post("/books", async (req, res) => {
  try {
    const result = await collectionService.createBooksCollection();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 2: POST /collection/authors - implicit collection creation via insert
router.post("/authors", async (req, res) => {
  try {
    // dynamic input via req.body, e.g. { name, nationality }
    const result = await collectionService.createAuthorImplicitly(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 3: POST /collection/logs/capped - capped collection, 1MB
router.post("/logs/capped", async (req, res) => {
  try {
    const result = await collectionService.createCappedLogsCollection();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 4: POST /collection/books/index - index on title field
router.post("/books/index", async (req, res) => {
  try {
    const indexName = await collectionService.createBooksTitleIndex();
    res.status(201).json(indexName);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
