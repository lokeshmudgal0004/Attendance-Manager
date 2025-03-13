import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    semester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
  },
  { timestamps: true }
);

courseSchema.index({ courseName: 1, semester: 1 }, { unique: true });

export const Course = mongoose.model("Course", courseSchema);
