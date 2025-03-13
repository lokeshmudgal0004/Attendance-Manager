import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  addAttendance,
  getCourseId,
  deleteAttendance,
  deleteCourse,
  getAttendances,
  getCourses,
} from "../controllers/course.controller.js";

const router = Router();

router.route("/add").post(verifyJwt, addAttendance);
router.route("/delete").post(verifyJwt, deleteAttendance);
router.route("/getCourse").post(verifyJwt, getCourseId);
router.route("/deleteCourse").post(verifyJwt, deleteCourse);
router.route("/getAttendance").post(verifyJwt, getAttendances);
router.route("/getCourses").post(verifyJwt, getCourses);
export default router;
