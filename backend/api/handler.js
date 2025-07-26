import serverless from "serverless-http";
import { app } from "../src/app.js";
import dotenv from "dotenv";
import { connectDB } from "../src/db/index.js";

// Load env
dotenv.config({ path: "./.env" });

let server;
let isConnected = false;

const handler = async (req, res) => {
  try {
    console.log("⚡ Function invoked:", req.url);

    if (!isConnected) {
      console.log("🧠 Attempting to connect to MongoDB...");
      await connectDB();
      isConnected = true;
      console.log("✅ MongoDB connection successful.");
    }

    if (!server) {
      server = serverless(app);
      console.log("🚀 Serverless wrapper initialized.");
    }

    return server(req, res);
  } catch (err) {
    console.error("❌ Fatal error in handler:", err);
    return res
      .status(500)
      .json({ error: "Server crashed", details: err.message });
  }
};

export default handler;
