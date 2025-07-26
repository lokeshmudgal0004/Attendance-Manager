import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { app } from "../src/app.js";

export default function handler(req, res) {
  console.log("✅ app imported");
  res.status(200).json({ message: "app is working" });
}
