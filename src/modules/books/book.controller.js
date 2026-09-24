import express from "express";
import * as bookService from "./book.service.js";

const router = express.Router();

// ---- Static/specific routes must be declared before any dynamic ones ----

// Task 6: POST /books/batch - insert multiple documents (at least 3)
router.post("/batch", async (req, res) => {
  try {
    const books = req.body; // expects an array of book objects
    if (!Array.isArray(books) || books.length < 1) {
      return res.status(400).json({ error: "Request body must be a non-empty array of books" });
    }
    const result = await bookService.insertManyBooks(books);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 9: GET /books/title?title=Brave New World
router.get("/title", async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) return res.status(400).json({ error: "title query param is required" });
    const book = await bookService.findBookByTitle(title);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 10: GET /books/year?from=1990&to=2010
router.get("/year", async (req, res) => {
  try {
    const { from, to } = req.query;
    if (!from || !to) return res.status(400).json({ error: "from and to query params are required" });
    const books = await bookService.findBooksByYearRange(from, to);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 11: GET /books/genre?genre=Science Fiction
router.get("/genre", async (req, res) => {
  try {
    const { genre } = req.query;
    if (!genre) return res.status(400).json({ error: "genre query param is required" });
    const books = await bookService.findBooksByGenre(genre);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 12: GET /books/skip-limit
router.get("/skip-limit", async (req, res) => {
  try {
    const { skip, limit } = req.query; // optional overrides, default 2/3
    const books = await bookService.skipLimitBooks(skip ?? 2, limit ?? 3);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 13: GET /books/year-integer
router.get("/year-integer", async (req, res) => {
  try {
    const books = await bookService.findBooksWithYearAsInteger();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 14: GET /books/exclude-genres?genres=Fantasy,Adventure
router.get("/exclude-genres", async (req, res) => {
  try {
    const { genres } = req.query;
    if (!genres) return res.status(400).json({ error: "genres query param is required" });
    const genresArray = genres.split(",").map((g) => g.trim());
    const books = await bookService.findBooksExcludingGenres(genresArray);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 15: DELETE /books/before-year?year=2000
router.delete("/before-year", async (req, res) => {
  try {
    const { year } = req.query;
    if (!year) return res.status(400).json({ error: "year query param is required" });
    const result = await bookService.deleteBooksBeforeYear(year);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 16: GET /books/aggregate1?year=2000
router.get("/aggregate1", async (req, res) => {
  try {
    const { year } = req.query;
    if (!year) return res.status(400).json({ error: "year query param is required" });
    const books = await bookService.aggregateFilterAfterYearSorted(year);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 17: GET /books/aggregate2?year=2000
router.get("/aggregate2", async (req, res) => {
  try {
    const { year } = req.query;
    if (!year) return res.status(400).json({ error: "year query param is required" });
    const books = await bookService.aggregateFilterAfterYearProjected(year);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 18: GET /books/aggregate3
router.get("/aggregate3", async (req, res) => {
  try {
    const books = await bookService.aggregateUnwindGenres();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 19: GET /books/aggregate4
router.get("/aggregate4", async (req, res) => {
  try {
    const result = await bookService.aggregateJoinWithLogs();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 8: PATCH /books/:title - update year for a specific book title
router.patch("/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const { year } = req.body;
    if (year === undefined) return res.status(400).json({ error: "year is required in body" });
    const result = await bookService.updateBookYearByTitle(title, year);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 5: POST /books - insert one document
router.post("/", async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: "title is required" });
    }
    const result = await bookService.insertOneBook(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
