import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes } from "react-router-dom";
import { SignerProvider } from "./actions/signerContext";
import { Provider } from "react-redux";
// import store from "./store";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Provider store={store}> */}
      <SignerProvider>
        <App />
      </SignerProvider>
      {/* </Provider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
