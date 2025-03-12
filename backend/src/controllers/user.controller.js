import { register } from "module";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateRegisterInput } from "../validators/register.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { validateSessionInput } from "../validators/session.js";
import { Session } from "../models/session.models.js";
import { Course } from "../models/course.models.js";
import { Attendance } from "../models/attendence.models.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken;
    const refreshToken = await user.generateRefreshToken;

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  const { errors, isValid } = validateRegisterInput(req.body);

  const err = {};

  if (!isValid) {
    console.log(errors);
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    err.validation = "User with email or username already exists";
    return res.status(409).json({ err });
  }

  const user = await User.create({
    fullName,
    email,
    password,
    username,
  }).then(console.log("user created successfully"));

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res.status(201).json({
    response: new ApiResponse(200, createdUser, "User registered Successfully"),
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const errors = {};

  const { username, password } = req.body;

  if (!username) {
    errors.username = "password is required";
    return res.status(404).json({ errors });
  }

  const user = await User.findOne({ username });

  if (!user) {
    errors.username = "username is not registered";
    return res.status(404).json({ errors });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    errors.password = "Invalid user password";
    return res.status(401).json({ errors });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      response: new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in Successfully"
      ),
    });
});

const logoutUser = await asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?.id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old Password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changes successfully"));
});

const getUserInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshtoken"
  );

  if (!user) {
    return res.status(404).json(new ApiResponse(404, {}, "User not found"));
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: user,
      },
      "user info provided"
    )
  );
});

const addNewSession = asyncHandler(async (req, res) => {
  const { user, semester, startedDate, endDate, courses } = req.body;

  const { errors, isValid } = validateSessionInput(req.body);

  if (!isValid) {
    return res.status(400).json({ errors });
  }

  // Check if the user already has a session with the same semester
  const existedSemester = await Session.findOne({ semester, user });

  if (existedSemester) {
    return res
      .status(400)
      .json({ error: "User already has a session with this semester number" });
  }

  // Check if all courses are unique
  const hasDuplicateCourses = (courses) =>
    new Set(courses).size !== courses.length;

  if (hasDuplicateCourses(courses)) {
    return res
      .status(400)
      .json({ error: "Courses should be unique within the session" });
  }

  // Ensure start date is before end date
  if (new Date(endDate) < new Date(startedDate)) {
    return res
      .status(400)
      .json({ error: "Start date should be before the end date" });
  }

  // Store courses and get their IDs
  const courseIds = await Promise.all(
    courses.map(async (courseName) => {
      const newCourse = await Course.create({ courseName });
      return newCourse._id;
    })
  );

  // Create session
  const newSession = await Session.create({
    semester,
    startedAt: startedDate,
    endDate,
    courses: courseIds,
    user: user._id,
  });

  if (!newSession) {
    throw new ApiError(500, "Something went wrong while creating the session");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, newSession, "Session created successfully"));
});

const getSessionId = asyncHandler(async (req, res) => {
  const { user, semester } = req.body;

  const session = await Session.findOne({ user: user._id, semester });

  if (!session) {
    return res
      .status(404)
      .json({ error: "this semester does not exist for user" });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { sessionId: session._id },
        "Session found successfully"
      )
    );
});

const deleteSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;

  // Check if session exists
  const session = await Session.findById(sessionId);
  if (!session) {
    return res.status(404).json({ error: "This session does not exist" });
  }

  // Get all courses linked to this session
  const courses = session.courses;

  // Delete all attendance records related to these courses
  await Attendance.deleteMany({ course: { $in: courses } });

  // Delete all courses linked to this session
  await Course.deleteMany({ _id: { $in: courses } });

  // Finally, delete the session itself
  await Session.deleteOne({ _id: sessionId });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Session deleted successfully"));
});

const getAttendancesBySession = asyncHandler(async (req, res) => {
  const { sessionId, courseName = [], status } = req.body;

  // Validate session existence
  const session = await Session.findById(sessionId);
  if (!session) {
    return res.status(404).json({ error: "This session does not exist" });
  }

  // Find courses linked to this session
  let courseFilter = { _id: { $in: session.courses } };

  if (Array.isArray(courseName) && courseName.length > 0) {
    courseFilter.courseName = { $in: courseName }; // Match courses in the array
  }

  const courses = await Course.find(courseFilter);
  if (courses.length === 0) {
    return res
      .status(404)
      .json({ error: "No matching courses found in this session" });
  }

  // Extract course IDs
  const courseIds = courses.map((course) => course._id);

  // Query filter for attendance
  let attendanceFilter = { course: { $in: courseIds } };
  if (status) {
    attendanceFilter.status = status; // Filter only if status is provided
  }

  // Fetch attendance records
  const attendances = await Attendance.find(attendanceFilter);

  return res
    .status(200)
    .json(
      new ApiResponse(200, attendances, "Attendances retrieved successfully")
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getUserInfo,
  addNewSession,
  getSessionId,
  changeCurrentPassword,
  deleteSession,
  getAttendancesBySession,
};
