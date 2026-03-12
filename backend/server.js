import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

// Apply rate limiter in production
if (process.env.NODE_ENV === "production") {
  app.use(rateLimiter);
}

// API route
app.use("/api/notes", notesRoutes);

// Serve React frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

// Connect database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started on PORT:", PORT);
    });
  })
  .catch((error) => {
    console.log("DB connection failed:", error);
  });