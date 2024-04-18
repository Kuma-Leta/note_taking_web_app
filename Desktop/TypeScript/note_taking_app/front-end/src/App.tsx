// import "./App.css";
import Signup from "./components/signup";
import Login from "./components/Login";
import Home from "./components/home";
import AddNotes from "./components/AddNotes";
// import { createContext,useContext, useState } from "react";
import PreviousNotes from "./components/PreviousNotes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

// import { GlobalStateContect } from "./GlobalStateContext";
const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const updateLoginStatus = (loginStatus: boolean) => {
    setIsLoggedIn(loginStatus);
    // console.log(isLoggedIn);
  };
  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);
  return (
    <div>
      {/* <Home /> */}
      <Router>
        <Routes>
          <Route path="/" element={<PreviousNotes />} />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <PreviousNotes />
              ) : (
                <Login updateFunction={updateLoginStatus} />
              )
            }
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
