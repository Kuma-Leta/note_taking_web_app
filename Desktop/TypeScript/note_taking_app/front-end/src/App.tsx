// import "./App.css";
import Signup from "./components/signup";
import Login from "./components/Login";
import Home from "./components/home";
import AddNotes from "./components/AddNotes";
import Note from "./components/Note";
// import { createContext,useContext, useState } from "react";
import PreviousNotes from "./components/PreviousNotes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import React, { useState } from "react";
import { NoteProvider } from "./myContext";
import { EditNote } from "./components/editNote";
import PrivateRoute from "./components/privateRoute";

const App: React.FC = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const {userId}=useMyContext()
  // const [userId,setUserId]=useState<string>()

  return (
    <div>
      {/* <Home /> */}
      <Router>
        <NoteProvider>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route
              path="/editNote/:id"
              element={
                <PrivateRoute>
                  <EditNote />
                </PrivateRoute>
              }
            />
            <Route
              path="/note"
              element={
                <PrivateRoute>
                  <Note />
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/previousNotes"
              element={
                <PrivateRoute>
                  <PreviousNotes />
                </PrivateRoute>
              }
            />
            <Route
              path="/addNotes"
              element={
                <PrivateRoute>
                  <AddNotes />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NoteProvider>
      </Router>
    </div>
  );
};

export default App;
