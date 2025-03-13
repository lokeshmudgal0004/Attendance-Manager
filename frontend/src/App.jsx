import { useEffect, useState } from "react";
import "./App.css";
import { LoginPage } from "./assets/pages/LoginPage.jsx";
import { RegisterPage } from "./assets/pages/RegisterPage.jsx";
import { LoadingPage } from "./assets/pages/LoadingPage.jsx";
import HomePage from "./assets/pages/HomePage.jsx";
import { useNavigate } from "react-router-dom";

function App() {
  const [element, setElement] = useState(<LoadingPage />);

  const navigate = useNavigate();

  const register = () => {
    navigate("/register");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setElement(<LoginPage onClickHandler={register} />);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return <>{element}</>;

  /*
  const [element, setElement] = useState(<LoadingPage />);

  const register = () => {
    setElement(<RegisterPage />);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setElement(<LoginPage onClickHandler={register} />);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <>{element}</>;*/
}

export default App;
