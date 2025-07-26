import serverless from "serverless-http";
import { app } from "../src/app.js";
import dotenv from "dotenv";
import { connectDB } from "../src/db/index.js";

// Load .env
dotenv.config({ path: "./.env" });

// Connect to DB once
let isConnected = false;
let handler;

const setup = async () => {
  if (!isConnected) {
    console.log("🌐 Connecting to MongoDB...");
    await connectDB();
    isConnected = true;
    console.log("✅ MongoDB connected");
  }

  if (!handler) {
    handler = serverless(app);
    console.log("🚀 serverless(app) initialized");
  }

  return handler;
};

// ✅ THIS is the correct export that Vercel expects
export default async function (req, res) {
  const _handler = await setup();
  return _handler(req, res);
}
