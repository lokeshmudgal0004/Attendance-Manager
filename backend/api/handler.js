import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export default function handler(req, res) {
  console.log("✅ dotenv loaded");
  return res.status(200).json({ message: "dotenv test passed" });
}
