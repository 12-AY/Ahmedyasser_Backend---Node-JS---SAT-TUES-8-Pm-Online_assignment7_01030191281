import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// __dirname doesn't exist in ES modules, so we rebuild it from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pick the right env file: NODE_ENV=production -> .env.production, otherwise .env.development
const envName = process.env.NODE_ENV === "production" ? "production" : "development";

dotenv.config({
  path: path.resolve(__dirname, `.env.${envName}`),
});

export const port = process.env.PORT || 3000;
export const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
export const dbName = process.env.DB_NAME || "assignment8_library";
