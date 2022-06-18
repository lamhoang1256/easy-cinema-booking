import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GlobalStyle } from "assets/styles/GlobalStyles";
import { store } from "App/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
