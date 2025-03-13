import React from "react";
import "./NavigationBar.css";
import { color1, color2, color3 } from "./colors";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar" style={{ background: color2 }}>
      <div className="nav-left">
        <span className="nav-icon" style={{ color: color3 }}>
          A
        </span>
        <span className="nav-item" style={{ color: color1 }}>
          <Link to={"/Home/user"} style={{ color: color1 }}>
            Profile
          </Link>
        </span>
        <span className="nav-item" style={{ color: color1 }}>
          <Link to={"/Home"} style={{ color: color1 }}>
            Active Sessions
          </Link>
        </span>
      </div>
      <div className="nav-left">
        <button
          className="button"
          onClick={() => {
            navigate("/Home/addSessionForm");
          }}
        >
          {" "}
          Session{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        <span className="nav-profile" style={{ color: color1 }}>
          PFP
        </span>
      </div>
    </div>
  );
};

export default NavigationBar;
