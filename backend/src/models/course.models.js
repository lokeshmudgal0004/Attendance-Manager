import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
