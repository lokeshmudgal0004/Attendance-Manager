import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    semester: {
      type: String,
      required: true,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
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
    },
  },
  {
    timestamps: true,
  }
);

export const Session = mongoose.model("Session", sessionSchema);
