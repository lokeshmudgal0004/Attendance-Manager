import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import HomePage from "./assets/pages/HomePage.jsx";
import Root from "./assets/components/Root.jsx";
import SessionRoot from "./assets/components/SessionRoot.jsx";
import CourseRoot from "./assets/components/CourseRoot.jsx";
import CoursePage from "./assets/pages/CoursePage.jsx";
import { RegisterPage } from "./assets/pages/RegisterPage.jsx";
import { SessionInput } from "./assets/components/SessionInput.jsx";
import UserInfo from "./assets/components/UserInfo.jsx";
import { AttendanceInput } from "./assets/components/AttendanceInput.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/Home",
    element: <HomePage />,
    children: [
      { index: true, element: <Root /> },
      {
        path: "Courses",
        element: <SessionRoot />,
      },
      {
        path: "addSessionForm",
        element: <SessionInput />,
      },
      {
        path: "user",
        element: <UserInfo />,
      },
      {
        path: "Attendance",
        element: <CoursePage />,
      },
      {
        path: "addAttendance",
        element: <AttendanceInput />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
