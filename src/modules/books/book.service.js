import { getDB } from "../../DB/db.service.js";

function booksCollection(db) {
  return db.collection("books");
}

// Task 5: Insert one document
export async function insertOneBook(bookData) {
  const db = await getDB();
  const payload = { ...bookData };
  if (payload.year !== undefined) payload.year = Number(payload.year);
  return booksCollection(db).insertOne(payload);
}

// Task 6: Insert multiple documents (at least 3 records)
export async function insertManyBooks(booksArray) {
  const db = await getDB();
  const payload = booksArray.map((b) => ({
    ...b,
    year: b.year !== undefined ? Number(b.year) : b.year,
  }));
  return booksCollection(db).insertMany(payload);
}

// Task 8: Update the book with a specific title, change its year to the inserted year
// PATCH /books/:title  body: { year: <new year> }
export async function updateBookYearByTitle(title, year) {
  const db = await getDB();
  return booksCollection(db).updateOne(
    { title },
    { $set: { year: Number(year) } }
  );
}

// Task 9: Find a book with specific title
// GET /books/title?title=Brave New World
export async function findBookByTitle(title) {
  const db = await getDB();
  return booksCollection(db).findOne({ title });
}

// Task 10: Find all books published in a specific range
// GET /books/year?from=1990&to=2010
export async function findBooksByYearRange(from, to) {
  const db = await getDB();
  return booksCollection(db)
    .find({ year: { $gte: Number(from), $lte: Number(to) } })
    .toArray();
}

// Task 11: Find books where the genre includes a specific genre
// GET /books/genre?genre=Science Fiction
export async function findBooksByGenre(genre) {
  const db = await getDB();
  return booksCollection(db).find({ genres: genre }).toArray();
}

// Task 12: Skip first two, limit to next three, sorted by year descending
// GET /books/skip-limit
export async function skipLimitBooks(skip = 2, limit = 3) {
  const db = await getDB();
  return booksCollection(db)
    .find({})
    .sort({ year: -1 })
    .skip(Number(skip))
    .limit(Number(limit))
    .toArray();
}

// Task 13: Find books where the year field is stored as an integer (BSON type "int")
// GET /books/year-integer
export async function findBooksWithYearAsInteger() {
  const db = await getDB();
  return booksCollection(db)
    .find({ year: { $type: "int" } })
    .toArray();
}

// Task 14: Find all books where genres does NOT include any of the inserted genres
// GET /books/exclude-genres?genres=Fantasy,Adventure
export async function findBooksExcludingGenres(genresArray) {
  const db = await getDB();
  return booksCollection(db)
    .find({ genres: { $nin: genresArray } })
    .toArray();
}

// Task 15: Delete all books published before the inserted year
// DELETE /books/before-year?year=2000
export async function deleteBooksBeforeYear(year) {
  const db = await getDB();
  return booksCollection(db).deleteMany({ year: { $lt: Number(year) } });
}

// Task 16: Aggregation - filter books published after inserted year, sort by year desc
// GET /books/aggregate1?year=2000
export async function aggregateFilterAfterYearSorted(year) {
  const db = await getDB();
  return booksCollection(db)
    .aggregate([
      { $match: { year: { $gt: Number(year) } } },
      { $sort: { year: -1 } },
    ])
    .toArray();
}

// Task 17: Aggregation - filter after inserted year, project only title/author/year
// GET /books/aggregate2?year=2000
export async function aggregateFilterAfterYearProjected(year) {
  const db = await getDB();
  return booksCollection(db)
    .aggregate([
      { $match: { year: { $gt: Number(year) } } },
      { $project: { _id: 0, title: 1, author: 1, year: 1 } },
    ])
    .toArray();
}

// Task 18: Aggregation - unwind genres array into separate documents
// GET /books/aggregate3
export async function aggregateUnwindGenres() {
  const db = await getDB();
  return booksCollection(db)
    .aggregate([
      { $unwind: "$genres" },
      { $project: { _id: 0, title: 1, genres: 1 } },
    ])
    .toArray();
}

// Task 19: Aggregation - join books with logs ($lookup)
// GET /books/aggregate4
export async function aggregateJoinWithLogs() {
  const db = await getDB();
  return db
    .collection("logs")
    .aggregate([
      {
        $lookup: {
          from: "books",
          localField: "book_id",
          foreignField: "_id",
          as: "book_details",
        },
      },
      { $project: { _id: 0, action: 1, book_details: { title: 1, author: 1, year: 1, _id: 0 } } },
    ])
    .toArray();
}
