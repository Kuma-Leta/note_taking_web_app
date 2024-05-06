// import "./App.css";
import Signup from "./components/signup";
import Login from "./components/Login";
import Home from "./components/home";
import AddNotes from "./components/AddNotes";
import Note from "./components/Note";
// import { createContext,useContext, useState } from "react";
import PreviousNotes from "./components/PreviousNotes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { NoteProvider } from "./myContext";
import { EditNote } from "./components/editNote";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const {userId}=useMyContext()
  // const [userId,setUserId]=useState<string>()
  const updateLoginStatus = async (status: boolean) => {
    setIsLoggedIn(status);
  };

  return (
    <div>
      {/* <Home /> */}
      <Router>
        <NoteProvider>
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
            <Route path="/editNote/:noteId" element={<EditNote />} />
            <Route path="/note" element={<Note />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/previousNotes" element={<PreviousNotes />} />
            <Route path="/addNotes" element={<AddNotes />} />
          </Routes>
        </NoteProvider>
      </Router>
    </div>
  );
};

export default App;
