import { useEffect, useState } from "react";
import { color3 } from "./colors";
import { Button2 } from "./Button2";
import { useLocation } from "react-router-dom";

const SessionRoot = ({}) => {
  const location = useLocation();
  const { sessionId } = location.state;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/courses/getCourses`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify({ sessionId }),
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCourses(data.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div
      style={{
        background: color3,
        minHeight: "100vh",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "left",
        // Adjust spacing between elements
      }}
    >
      {courses.map((course, index) => (
        <Button2
          k={course._id || index}
          text={course.courseName}
          courseId={course._id}
          sessionId={sessionId}
        />
      ))}
    </div>
  );
};

export default SessionRoot;
