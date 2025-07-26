// api/handler.js
import serverless from "serverless-http";
import { app } from "../src/app.js";
import dotenv from "dotenv";
import { connectDB } from "../src/db/index.js";

dotenv.config({
  path: "./.env",
});

// Ensure DB connection before exporting
let isConnected = false;

async function setup() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  return serverless(app);
}

export default async function handler(req, res) {
  const server = await setup();
  return server(req, res);
}
