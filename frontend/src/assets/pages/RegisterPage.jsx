import "../pagesCSS/RegisterPage.css"; // Import CSS file
import { color1, color2, color3, color4 } from "../components/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage({}) {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json ; charset=utf-8" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.err?.validation || "registration failed");
        return;
      }

      console.log("User Registered:", result.response);
      navigate("/");
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };
  return (
    <section className="register-container">
      {/* Attendance Manager Logo (Drakors Font) Outside the Box */}
      <div className="register-logo">
        <div>Attendance</div>
        <div>Manager</div>
      </div>

      <div className="register-box">
        <h1 className="register-heading">Registration Form</h1>

        <label htmlFor="username" className="register-label">
          Username:
        </label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          className="register-input"
          onChange={(e) => {
            setData({ ...data, username: e.target.value });
          }}
        />

        <label htmlFor="email" className="register-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="register-input"
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />

        <label htmlFor="password" className="register-label">
          A 6-30 digit password:
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          className="register-input"
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />

        <label htmlFor="fullname" className="register-label">
          Your full name:
        </label>
        <input
          type="text"
          id="fullname"
          placeholder="Enter your full name"
          className="register-input"
          onChange={(e) => {
            setData({ ...data, fullName: e.target.value });
          }}
        />

        <button className="register-button" onClick={() => handleSubmit()}>
          REGISTER
        </button>
      </div>
    </section>
  );
}

export { RegisterPage };
