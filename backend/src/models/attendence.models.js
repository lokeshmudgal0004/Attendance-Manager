import mongoose from "mongoose";

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  attendance: {
    type: Boolean,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // Link attendance to a course
    required: true,
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = attendance;
