import React, { useState, useEffect } from "react";
import "./UserInfo.css"; // Import the CSS file

const UserInfo = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    createdAt: "",
    updatedAt: "",
    fullName: "",
  });

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/users/getInfo",
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUser(data.data.user);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="user-info-container">
      <h1 className="user-info-title">User Information</h1>
      <div className="user-info-card">
        <p>
          <strong>Username:</strong> {user.username}
        </p>{" "}
        <br />
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <br />
        <p>
          <strong>Full Name:</strong> {user.fullName}
        </p>
        <br />
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <br />
        <p>
          <strong>Updated At:</strong>{" "}
          {new Date(user.updatedAt).toLocaleDateString()}
        </p>
        <br />
      </div>
    </div>
  );
};

export default UserInfo;
