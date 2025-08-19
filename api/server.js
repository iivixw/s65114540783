const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const { ping } = require("./db");

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

// route ตรวจสุขภาพ DB
app.get("/health", async (_req, res) => {
  try {
    const now = await ping();
    res.json({ ok: true, now });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () =>
  console.log(`API running in ${process.env.NODE_ENV} on :${port}`)
);
