import { useNavigate } from "react-router-dom";
import { color1, color2, color3 } from "./colors";

const Button2 = ({ k, text, courseId, sessionId }) => {
  const navigate = useNavigate();
  return (
    <button
      style={{
        background: color2,
        color: color1,
        height: "300px",
        width: "25%",
        margin: "25px",
        borderRadius: "150px",
        fontSize: "40px",
        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
      }}
      key={k}
      onClick={() => {
        navigate("/Home/Attendance", {
          state: {
            courseId: courseId,
            courseName: text,
            sessionId: sessionId,
          },
        });
      }}
    >
      {text}
    </button>
  );
};

export { Button2 };
