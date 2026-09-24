import { getDB } from "../../DB/db.service.js";
import { ObjectId } from "mongodb";

/**
 * Task 7: Insert a new log document, e.g. { book_id, action }.
 * Converts book_id to ObjectId when it looks like a valid Mongo id so that
 * the aggregate4 $lookup join (books <-> logs) works correctly.
 */
export async function insertLog(logData) {
  const db = await getDB();

  const payload = { ...logData };
  if (payload.book_id && ObjectId.isValid(payload.book_id)) {
    payload.book_id = new ObjectId(payload.book_id);
  }

  const result = await db.collection("logs").insertOne(payload);
  return result;
}
