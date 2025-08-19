import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// ถ้าไม่ได้ใช้ web vitals ลบบรรทัดถัดไปทิ้งได้
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ถ้าไม่ใช้ก็ลบบรรทัดนี้ด้วย
// reportWebVitals();
