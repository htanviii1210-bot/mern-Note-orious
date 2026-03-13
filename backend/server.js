import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
app.use(
cors({
origin: "http://localhost:5173",
})
);
}

app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("*", (req, res) => {
res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
}

connectDB()
.then(() => {
app.listen(PORT, () => {
console.log("Server started on PORT:", PORT);
});
})
.catch((error) => {
console.log("DB connection failed:", error);
});