import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";
import "flag-icons/css/flag-icons.min.css";
import { store } from "./app/store";
import { Provider } from "react-redux"; 
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
   <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);