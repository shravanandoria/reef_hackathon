import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes } from "react-router-dom";
import { SignerProvider } from "./signerContext";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SignerProvider>
        <App />
      </SignerProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
