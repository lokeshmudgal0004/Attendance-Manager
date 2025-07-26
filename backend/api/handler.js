import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected at ${connection.connection.host}`);

    // Ping the DB to be sure:
    await mongoose.connection.db.admin().ping();
    console.log("✅ Pinged MongoDB successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};
