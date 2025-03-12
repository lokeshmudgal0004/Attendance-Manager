import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  addAttendance,
  getCourseId,
  deleteAttendance,
  deleteCourse,
  getAttendances,
} from "../controllers/course.controller.js";

const router = Router();

router.route("/add").post(verifyJwt, addAttendance);
router.route("/delete").post(verifyJwt, deleteAttendance);
router.route("/getCourse").post(verifyJwt, getCourseId);
router.route("/deleteCourse").post(verifyJwt, deleteCourse);
router.route("/getAttendance").post(verifyJwt, getAttendances);

export default router;
