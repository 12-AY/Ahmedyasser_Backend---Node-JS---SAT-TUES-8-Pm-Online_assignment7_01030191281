import express from "express";
import collectionRouter from "./modules/collections/collection.controller.js";
import bookRouter from "./modules/books/book.controller.js";
import logRouter from "./modules/logs/log.controller.js";

export function bootstrap(app) {
  app.use(express.json());

  // Root endpoint
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Assignment 8 API" });
  });

  app.use("/collection", collectionRouter); // tasks 1-4
  app.use("/books", bookRouter);             // tasks 5,6,8-19
  app.use("/logs", logRouter);               // task 7

  // 404 Fallback
  app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
  });
}