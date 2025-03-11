import "../pagesCSS/LoginPage.css"; // Import CSS file
import { color1, color2, color3, color4 } from "../components/colors";

function LoginPage({ onClickHandler }) {
  return (
    <section className="login-container">
      <div className="login-logo">
        <div>Attendance Manager</div>
        <div>---------------------</div> {/* Corrected empty div */}
      </div>
      <div className="login-box">
        <h1 className="login-heading">Have an account?</h1>

        <input type="text" placeholder="Username" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />

        <button className="login-button">SIGN IN</button>

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
