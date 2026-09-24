import { connectDB } from "./connectionDB.js";

/**
 * Returns the active db handle. Since connectDB() caches the connection,
 * calling this from any service just reuses the same instance.
 */
export async function getDB() {
  return connectDB();
}
