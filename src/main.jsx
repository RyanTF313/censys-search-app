import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
//IMPORT HashRouter and rename it to Router
import { HashRouter as Router } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);