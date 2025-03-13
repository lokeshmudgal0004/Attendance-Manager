import "../pagesCSS/LoginPage.css"; // Import CSS file
import { color1, color2, color3, color4 } from "../components/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ onClickHandler }) {
  const [data, setData] = useState({
    username: "",

    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (data.username === "") {
      alert("username feild is not filled");
      return;
    }
    if (data.password === "") {
      alert("password is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const res = await response.json();

      if (!response.ok) {
        alert(res.errors?.username || res.errors?.password || "login failed");
        return;
      }

      console.log("User Registered:", res.response);
      navigate("/Home");
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  return (
    <section className="login-container">
      <div className="login-logo">
        <div>Attendance Manager</div>
        <div>---------------------</div> {/* Corrected empty div */}
      </div>
      <div className="login-box">
        <h1 className="login-heading">Have an account?</h1>

        <input
          type="text"
          placeholder="Username"
          className="login-input"
          onChange={(e) => {
            setData({ ...data, username: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />

        <button className="login-button" onClick={() => handleSubmit()}>
          SIGN IN
        </button>

        <div className="login-options">
          <div>
            <input type="checkbox" id="agree" className="login-checkbox" />
            <label htmlFor="agree" style={{ color: color1 }}>
              <u>Remember Me</u>
            </label>
          </div>
          <u style={{ color: color1 }}>Forgot Password?</u>
        </div>

        <h4 className="login-divider">
          ================== OR ==================
        </h4>

        <button className="login-button" onClick={onClickHandler}>
          REGISTER USING EMAIL
        </button>
      </div>
    </section>
  );
}

export { LoginPage };
