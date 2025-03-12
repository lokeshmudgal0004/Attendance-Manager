import React from "react";
import "./NavigationBar.css";
import { color1, color2, color3 } from "./colors";

const NavigationBar = () => {
  return (
    <div className="navbar" style={{ background: color2 }}>
      <div className="nav-left">
        <span className="nav-icon" style={{ color: color3 }}>
          A
        </span>
        <span className="nav-item" style={{ color: color1 }}>
          Profile
        </span>
        <span className="nav-item" style={{ color: color1 }}>
          Active Sessions
        </span>
      </div>
      <div className="nav-left">
        <button className="button">
          {" "}
          Session{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
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
