import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    semester: {
      type: Number,
      unique: true,
      required: true,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    color: {
      type: String,
      default: "lavender-0",
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const session = mongoose.model("Session", sessionSchema);
