import { getDB } from "../../DB/db.service.js";
import { booksValidator } from "../../DB/models/book.model.js";

/**
 * Task 1: Explicit collection creation with a validation rule
 * (non-empty "title" field required on every document).
 */
export async function createBooksCollection() {
  const db = await getDB();
  const existing = await db.listCollections({ name: "books" }).toArray();

  if (existing.length > 0) {
    return { ok: 1, message: "books collection already exists" };
  }

  await db.createCollection("books", { validator: booksValidator });
  return { ok: 1 };
}

/**
 * Task 2: Implicit collection creation — MongoDB creates "authors"
 * automatically the first time we insert into it.
 */
export async function createAuthorImplicitly(authorData) {
  const db = await getDB();
  const result = await db.collection("authors").insertOne(authorData);
  return result;
}

/**
 * Task 3: Capped collection "logs" limited to 1MB.
 */
export async function createCappedLogsCollection() {
  const db = await getDB();
  const existing = await db.listCollections({ name: "logs" }).toArray();

  if (existing.length > 0) {
    return { ok: 1, message: "logs collection already exists" };
  }

  await db.createCollection("logs", {
    capped: true,
    size: 1024 * 1024, // 1MB
  });
  return { ok: 1 };
}

/**
 * Task 4: Index on books.title
 */
export async function createBooksTitleIndex() {
  const db = await getDB();
  const indexName = await db.collection("books").createIndex({ title: 1 });
  return indexName; // e.g. "title_1"
}
