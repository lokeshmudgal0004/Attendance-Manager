import { useNavigate } from "react-router-dom";
import { color1, color2, color3 } from "./colors";

const Button = ({ k, text, sessionId }) => {
  const navigate = useNavigate();
  return (
    <button
      style={{
        background: color2,
        color: color1,
        height: "300px",
        width: "25%",
        margin: "25px",
        borderRadius: "50px",
        fontSize: "40px",
        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
      }}
      key={k}
      onClick={() => {
        navigate("/Home/Courses", {
          state: {
            sessionId: sessionId,
          },
        });
      }}
    >
      {text}
    </button>
  );
};

export { Button };
