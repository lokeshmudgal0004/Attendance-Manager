import { color3 } from "../components/colors";
import { AttendanceInput } from "../components/AttendanceInput";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import Root from "../components/Root";
import { SessionInput } from "../components/SessionInput";
import SessionRoot from "../components/SessionRoot";
import CourseRoot from "../components/CourseRoot";
import CoursePage from "./CoursePage";
import UserInfo from "../components/UserInfo";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <NavigationBar />
      <Outlet></Outlet>
      <Footer />
    </>
  );
};

export default HomePage;
