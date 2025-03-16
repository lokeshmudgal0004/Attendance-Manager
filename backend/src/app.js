import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin:
      "https://attendance-manager-m4ag-git-main-lokesh-mudgals-projects.vercel.app",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";
import courseRouter from "./routes/courses.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);

export { app };
