import { useNavigation } from "react-router-dom";
import "../pagesCSS/RegisterPage.css"; // Import CSS file
import { color1, color2, color3, color4 } from "./colors";
import { useState } from "react";

const SessionInput = () => {
  const [data, setData] = useState({
    semester: "",
    startedDate: "",
    endDate: "",
    courses: [],
  });

  const navigation = useNavigation();

  const handleSubmit = async () => {
    console.log(data);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/users/addSession`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json;charset=utf-8" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Session creation failed!");
        return;
      }

      console.log("New Session added:", result.response);
      alert("New session added");
      navigation("/Home");
    } catch (error) {
      console.error("Session Addition Error:", error);
    }
  };

  return (
    <section className="register-container" style={{ background: color4 }}>
      <div className="register-box">
        <h1 className="register-heading">New Session details :- </h1>

        <label htmlFor="semester" className="register-label">
          Semester:
        </label>
        <input
          type="text"
          id="semester"
          placeholder="Enter your semester(unique)"
          className="register-input"
          onChange={(e) => {
            setData({ ...data, semester: e.target.value });
          }}
        />

        <label htmlFor="startDate" className="register-label">
          StartDate(YYYY-MM-DD):
        </label>
        <input
          type="date"
          id="startDate"
          placeholder="Enter your semester starting date:"
          className="register-input"
          onChange={(e) => {
            setData({ ...data, startedDate: e.target.value });
          }}
        />

        <label htmlFor="endDate" className="register-label">
          EndDate(YYYY-MM-DD):
        </label>
        <input
          type="date"
          id="endDate"
          placeholder="Enter your semester ending date:"
          className="register-input"
          onChange={(e) => {
            setData({ ...data, endDate: e.target.value });
          }}
        />

        <label htmlFor="courses" className="register-label">
          Add courses:
        </label>
        <input
          type="text"
          id="courses"
          placeholder="Enter your semester courses (comma separated):"
          className="register-input"
          onChange={(e) => {
            const courseArray = e.target.value
              .split(",")
              .map((course) => course.trim())
              .filter((course) => course.length > 0);

            setData({ ...data, courses: courseArray });
          }}
        />

        <button className="register-button" onClick={() => handleSubmit()}>
          ADD SESSION
        </button>
      </div>
    </section>
  );
};

export { SessionInput };
