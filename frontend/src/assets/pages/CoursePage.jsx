import { useState, useEffect } from "react";
import "../pagesCSS/CoursePage.css"; // Import CSS
import CourseRoot from "../components/CourseRoot";
import { useLocation, useNavigate } from "react-router-dom";

const CoursePage = ({}) => {
  const location = useLocation();
  const { sessionId, courseId, courseName } = location.state;
  const [attendanceData, setAttendanceData] = useState({
    total: 0,
    present: 0,
    absent: 0,
  });

  const [filter, setFilter] = useState(""); // Filter state
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/courses/getAttendance`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify({ courseId }),
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCourses(data.data);

        const presentCount = data.data.filter(
          (c) => c.status === "present"
        ).length;
        const absentCount = data.data.filter(
          (c) => c.status === "absent"
        ).length;

        setAttendanceData({
          total: data.data.length,
          present: presentCount,
          absent: absentCount,
        });
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [courseId]);

  const onDeleteEntry = async (dateToDelete) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/courses/delete`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json;charset=utf-8" },
          body: JSON.stringify({ courseId, date: dateToDelete }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Deleted entry:", data);

      // Remove deleted entry from state
      setCourses((prevCourses) =>
        prevCourses.filter((entry) => entry.date !== dateToDelete)
      );

      const presentCount = courses.filter((c) => c.status === "present").length;
      const absentCount = courses.filter((c) => c.status === "absent").length;

      setAttendanceData({
        total: courses.length,
        present: presentCount,
        absent: absentCount,
      });

      alert("Entry deleted successfully!");
    } catch (error) {
      console.error("Error deleting entry:", error);
      alert("Failed to delete entry!");
    }
  };

  return (
    <section className="course-container">
      {/* Attendance Summary */}
      <div className="attendance-summary">
        <div className="attendance-box total">
          Total: {attendanceData.total}
        </div>
        <div className="attendance-box present">
          Present: {attendanceData.present}
        </div>
        <div className="attendance-box absent">
          Absent: {attendanceData.absent}
        </div>
      </div>

      {/* Actions */}
      <div className="actions">
        <button
          className="add-attendance"
          onClick={() => {
            navigate("/Home/addAttendance", {
              state: {
                sessionId: sessionId,
                courseName: courseName,
              },
            });
          }}
        >
          Add Attendance
        </button>

        <select
          className="filter-dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>
      </div>

      <br />
      <h1 style={{ textAlign: "center" }}>Attendance Records</h1>
      <br />

      {/* Table Header */}
      <div className="attendance-records">
        <div>Course Name</div>
        <div>Date</div>
        <div>Status</div>
        <div>Action</div>
      </div>

      <CourseRoot
        courses={courses}
        courseName={courseName}
        onDeleteEntry={onDeleteEntry}
      />
    </section>
  );
};

export default CoursePage;
