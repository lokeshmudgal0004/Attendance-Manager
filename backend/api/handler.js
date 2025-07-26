import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { connectDB } from "../src/db/index.js";

export default async function handler(req, res) {
  try {
    console.log("⏳ Trying to connect to MongoDB...");
    await connectDB();
    console.log("✅ connectDB succeeded");
    res.status(200).json({ message: "DB connected" });
  } catch (err) {
    console.error("❌ DB connect failed:", err);
    res.status(500).json({ error: err.message });
  }
}
