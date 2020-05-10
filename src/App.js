import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/MainComponent.js";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );
}
