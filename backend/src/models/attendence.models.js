import mongoose from "mongoose";

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  status: {
    type: String,
    enum: ["present", "absent"],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

export const Attendance = mongoose.model("Attendance", attendanceSchema);
