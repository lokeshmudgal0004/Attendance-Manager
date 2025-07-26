import serverless from "serverless-http";
import { app } from "../src/app.js";
import dotenv from "dotenv";
import { connectDB } from "../src/db/index.js";

dotenv.config({ path: "./.env" });

let server;
let isConnected = false;

const handler = async (req, res) => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.error("❌ MongoDB connection error:", err);
      return res.status(500).json({ error: "DB connection failed" });
    }
  }

  if (!server) {
    server = serverless(app);
  }

  return server(req, res);
};

export default handler;
