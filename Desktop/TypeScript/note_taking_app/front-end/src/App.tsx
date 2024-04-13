// import "./App.css";
import Signup from "./components/signup";
import Login from "./components/Login";
import Home from "./components/home";
import PreviousNotes from "./components/PreviousNotes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
// import { GlobalStateContect } from "./GlobalStateContext";
const App: React.FC = () => {
  // const { isLoggedIn } = useContext(GlobalStateContect);
  return (
    <div>
      {/* <Home /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
