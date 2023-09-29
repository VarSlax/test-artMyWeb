import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DataProvider } from "./utils/DataContext.js";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <DataProvider>
      <App />
    </DataProvider>
  </BrowserRouter>
);
