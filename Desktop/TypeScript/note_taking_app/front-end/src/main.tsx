import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
// import { GlobalStateProvider } from "./GlobalStateContext";
import "./styles/index.css";

// ReactDOM.createRootimport { Router } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
