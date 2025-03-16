import { useEffect, useState } from "react";
import { color3 } from "./colors";
import { Button } from "./Button";

const Root = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/users/getSessions`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setSessions(data.data);
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
        justifyContent: "left", // Adjust spacing between elements
      }}
    >
      {sessions.map((session, index) => (
        <Button
          k={session._id || index}
          text={session.semester}
          sessionId={session._id}
        />
      ))}
    </div>
  );
};

export default Root;
