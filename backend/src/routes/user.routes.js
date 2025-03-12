import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
  logoutUser,
  refreshAccessToken,
  addNewSession,
  getSessionId,
  deleteSession,
  getAttendancesBySession,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

//secured routes
router.route("/getInfo").get(verifyJwt, getUserInfo);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/addSession").post(verifyJwt, addNewSession);
router.route("/getSession").post(verifyJwt, getSessionId);
router.route("/delete").post(verifyJwt, deleteSession);
router.route("/getAttendence").post(verifyJwt, getAttendancesBySession);

export default router;
