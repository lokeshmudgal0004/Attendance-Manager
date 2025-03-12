import { color3 } from "../components/colors";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";

const HomePage = () => {
  return (
    <>
      <NavigationBar />
      <div style={{ background: color3, height: "100vh" }}>Hi</div>
      <Footer />
    </>
  );
};

export default HomePage;
