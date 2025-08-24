import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// กรณี public/index.html ไม่มี <div id="root">
function ensureRoot() {
  let el = document.getElementById("root");
  if (!el) {
    document.body.innerHTML = "";
    el = document.createElement("div");
    el.id = "root";
    document.body.appendChild(el);
  }
  return el;
}

const root = createRoot(ensureRoot());
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
