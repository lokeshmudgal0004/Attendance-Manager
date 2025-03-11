import "../pagesCSS/LoadingPage.css"; // Import the new CSS file
import { color2, color3 } from "../components/colors.jsx";

function LoadingPage() {
  return (
    <section className="loading-container" style={{ background: color2 }}>
      <div className="loading-text" style={{ color: color3 }}>
        <div>Attendance</div>
        <div>Manager</div>
      </div>
    </section>
  );
}

export { LoadingPage };
