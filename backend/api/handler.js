export default function handler(req, res) {
  console.log("✅ Minimal handler reached");
  return res.status(200).json({ message: "Simple handler works" });
}
