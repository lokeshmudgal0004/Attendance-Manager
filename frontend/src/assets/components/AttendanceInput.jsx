import { useLocation, useNavigate } from "react-router-dom";
import "../pagesCSS/RegisterPage.css"; // Import CSS file
import { color1, color2, color3, color4 } from "./colors";
import { useState } from "react";

const AttendanceInput = ({}) => {
  const [data, setData] = useState({
    courseId: "",
    date: "",
    status: "",
  });

  const location = useLocation();
  const { sessionId, courseName } = location.state;

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Fetch courseId using sessionId & courseName
      const response = await fetch(
        "http://localhost:8000/api/v1/courses/getCourse",
        {
          method: "POST",
          headers: { "Content-Type": "application/json;charset=utf-8" },
          credentials: "include",
          body: JSON.stringify({ sessionId, courseName }),
        }
      );

      const result = await response.json();
      console.log("Course ID fetch result:", result); // Debugging log

      if (!response.ok || !result.data || !result.data.courseId) {
        alert(result.message || "Course ID not fetched!");
        return;
      }

      // Update data with fetched courseId
      const newData = { ...data, courseId: result.data.courseId };

      console.log("Updated Data Before Sending:", newData); // Debugging log

      // Now send attendance data with the updated courseId
      const response2 = await fetch(
        "http://localhost:8000/api/v1/courses/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json;charset=utf-8" },
          credentials: "include",
          body: JSON.stringify(newData),
        }
      );

      const result2 = await response2.json();

      if (!response2.ok) {
        alert(result2.message || "Attendance submission failed!");
        return;
      }

      console.log("New attendance added:", result2.response);
      alert("New attendance added!");
      navigate("/Home/Attendance", {
        state: {
          sessionId,
          courseName,
          courseId: newData.courseId,
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="register-container" style={{ background: color4 }}>
      <div className="register-box">
        <h1 className="register-heading">New Entry details :- </h1>

        <label htmlFor="date" className="register-label">
          Lecture Date(YYYY-MM-DD):
        </label>
        <input
          type="date"
          id="date"
          placeholder="Enter date:"
          className="register-input"
          onChange={(e) => {
            setData({ ...data, date: e.target.value });
          }}
        />

        <label htmlFor="status" className="register-label">
          Status:
        </label>
        <select
          id="status"
          className="register-input"
          onChange={(e) => {
            setData({ ...data, status: e.target.value });
          }}
        >
          <option value="">Select Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>

        <button className="register-button" onClick={() => handleSubmit()}>
          ADD ATTENDANCE
        </button>
      </div>
    </section>
  );
};

export { AttendanceInput };
