import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { Session } from "../models/session.models.js";
import { Course } from "../models/course.models.js";
import { validateAttendanceInput } from "../validators/attendance.js";
import { Attendance } from "../models/attendence.models.js";
import mongoose from "mongoose";

const addAttendance = asyncHandler(async (req, res) => {
  let { courseId, date, status } = req.body;

  // Validate input
  const { errors, isValid } = validateAttendanceInput(req.body);
  if (!isValid) {
    return res.status(400).json({ errors });
  }

  // Check if course exists
  const existingCourse = await Course.findById(
    new mongoose.Types.ObjectId(courseId)
  );
  if (!existingCourse) {
    return res.status(400).json({ error: "This course doesn't exist" });
  }

  //check if attendance exist
  const existingAttendance = await Attendance.findOne({
    course: new mongoose.Types.ObjectId(courseId),
    date: date,
  });

  if (existingAttendance) {
    return res.status(400).json({
      error: "User already had a lecture with this date in this course",
    });
  }

  // Create attendance
  const newAttendance = await Attendance.create({
    status,
    date: date,
    course: courseId,
  });

  if (!newAttendance) {
    throw new ApiError(500, "Something went wrong while creating attendance");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, newAttendance, "Attendance created successfully")
    );
});

const getCourseId = asyncHandler(async (req, res) => {
  const { sessionId, courseName } = req.body;

  const session = await Session.findById(sessionId);
  if (!session) {
    return res.status(404).json({ error: "this session does not exist" });
  }

  const courses = await Course.find({ _id: { $in: session.courses } });
  const course = courses.find((c) => c.courseName === courseName);
  if (!course) {
    return res
      .status(404)
      .json({ error: "this course does not exist in this session" });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { courseId: course._id },
        "Course found successfully"
      )
    );
});

const deleteAttendance = asyncHandler(async (req, res) => {
  const { courseId, date } = req.body;

  // Validate input
  if (!courseId || !date) {
    return res.status(400).json({ error: "Course ID and date are required" });
  }

  // Check if attendance exists
  const attendance = await Attendance.findOne({ course: courseId, date });
  if (!attendance) {
    return res.status(404).json({ error: "Attendance record not found" });
  }

  // Delete attendance record
  await Attendance.deleteOne({ _id: attendance._id });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Attendance deleted successfully"));
});

const deleteCourse = asyncHandler(async (req, res) => {
  const { sessionId, courseName } = req.body;

  // Check if session exists
  const session = await Session.findById(sessionId);
  if (!session) {
    return res.status(404).json({ error: "This session does not exist" });
  }

  // Find the course inside the session's courses
  const course = await Course.findOne({
    _id: { $in: session.courses },
    courseName,
  });

  if (!course) {
    return res
      .status(404)
      .json({ error: "This course does not exist in this session" });
  }

  // Delete all attendance records linked to this course
  await Attendance.deleteMany({ course: course._id });

  // Remove course from session's courses array
  await Session.updateOne(
    { _id: sessionId },
    { $pull: { courses: course._id } }
  );

  // Delete the course itself
  await Course.deleteOne({ _id: course._id });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Course deleted successfully"));
});

const getAttendances = asyncHandler(async (req, res) => {
  const { courseId, status } = req.body;

  // Validate if the course exists
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ error: "This course does not exist" });
  }

  // Query filter
  let filter = { course: courseId };
  if (status) {
    filter.status = status; // Filter only if status is provided
  }

  // Fetch attendance records based on filters
  const attendances = await Attendance.find(filter);

  return res
    .status(200)
    .json(
      new ApiResponse(200, attendances, "Attendances retrieved successfully")
    );
});

const getCourses = asyncHandler(async (req, res) => {
  const { sessionId } = req.body; // Extract sessionId from query params

  // Validate session existence
  const session = await Session.findById(sessionId);
  if (!session) {
    return res.status(404).json({ error: "This session does not exist" });
  }

  // Get course names from course IDs stored in session
  const courses = await Course.find({ _id: { $in: session.courses } }).select(
    "courseName"
  );

  if (!courses.length) {
    return res.status(404).json({ error: "No courses found for this session" });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, courses, "Course names retrieved successfully"));
});

export {
  getCourses,
  addAttendance,
  getCourseId,
  deleteAttendance,
  deleteCourse,
  getAttendances,
};
