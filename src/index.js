import express from "express";
import { port } from "../config/config.service.js";
import { connectDB } from "./DB/connectionDB.js";
import { bootstrap } from "./app.controller.js";

async function main() {
  await connectDB();

  const app = express();
  bootstrap(app);

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
