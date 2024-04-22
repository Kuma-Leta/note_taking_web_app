// import "./App.css";
import Signup from "./components/signup";
import Login from "./components/Login";
import Home from "./components/home";
import AddNotes from "./components/AddNotes";
import Note from "./components/Note";
// import { createContext,useContext, useState } from "react";
import PreviousNotes from "./components/PreviousNotes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

// import { GlobalStateContect } from "./GlobalStateContext";
// interface display {
//   added: boolean;
//   setAdded: () => void;
// }
// const myContext: Context<display> = createContext<display>({
//   added: false,
//   setAdded: () => {},
// });
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
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Note />
              ) : (
                <Login updateFunction={updateLoginStatus} />
              )
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/previousNotes" element={<PreviousNotes />} />
          <Route path="/addNotes" element={<AddNotes />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
