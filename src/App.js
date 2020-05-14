import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/MainComponent.js";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

export default function App() {
  const store = ConfigureStore();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
}
