import { MongoClient } from "mongodb";
import { mongoUri, dbName } from "../../config/config.service.js";

let client;
let db;

/**
 * Connects once to MongoDB and caches the client/db so every module reuses
 * the same connection pool instead of opening a new one per request.
 */
export async function connectDB() {
  if (db) return db;

  client = new MongoClient(mongoUri);
  await client.connect();
  db = client.db(dbName);

  console.log(`MongoDB connected -> ${mongoUri}/${dbName}`);
  return db;
}
