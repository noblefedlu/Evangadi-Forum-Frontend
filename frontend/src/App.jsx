import { useEffect, useState, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "./utils/axiosConfig";
import "./App.css";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import AnswerPage from "./pages/Answer/AnswerPage.jsx";
import AskQuestion from "./pages/Question/AskQuestion.jsx";
import Landing from "./components/Landing/Landing.jsx";
import Four04 from "./pages/Four04/Four04.jsx";
export const AppState = createContext();
function App() {
  const [user, setUser] = useState(null); // Initialize user to null
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  async function checkUser() {
    try {
      if (token) {
        // Only check if token exists.
        const { data } = await axios.get("/users/check", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setUser(data);
      } else {
        setUser(null); // if there is no token, set user to null.
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response);
      setUser(null);
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, [navigate]);

  useEffect(() => {
    // Function to clear token on tab close
    const handleTabClose = () => {
      localStorage.removeItem("token");
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem("token"); // Clear token from local storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Header logout={logout} />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<Landing />} />
        <Route path="/register" element={<Landing />} />
        <Route
          path="/answer/get-answer/:question_id"
          element={<AnswerPage />}
        />
        <Route path="/ask-question" element={<AskQuestion />} />
        <Route path="*" element={<Four04 />} />
      </Routes>
      <Footer />
    </AppState.Provider>
  );
}

export default App;
