import "../pagesCSS/RegisterPage.css"; // Import CSS file
import { color1, color2, color3, color4 } from "../components/colors";

function RegisterPage() {
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
        />

        <label htmlFor="email" className="register-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="register-input"
        />

        <label htmlFor="password" className="register-label">
          A 6-30 digit password:
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          className="register-input"
        />

        <label htmlFor="fullname" className="register-label">
          Your full name:
        </label>
        <input
          type="text"
          id="fullname"
          placeholder="Enter your full name"
          className="register-input"
        />

        <label htmlFor="file-upload" className="register-label">
          Upload an Avatar (optional):
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/png"
          className="register-file"
        />

        <button className="register-button">REGISTER</button>
      </div>
    </section>
  );
}

export { RegisterPage };
