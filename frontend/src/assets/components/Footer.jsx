import { color1, color2, color3, color4 } from "./colors";
const Footer = () => {
  return (
    <div style={{ background: color2, height: "70px", width: "100%" }}>
      <div
        style={{
          color: color1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          textAlign: "center",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <p style={{ fontSize: "20px" }}>
          Designed by Lokesh Mudgal © 2025 || All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
