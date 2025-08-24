const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const { ping } = require("./db");

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

// เสิร์ฟไฟล์ที่ถูก build แล้ว
const PUBLIC_DIR = path.resolve(__dirname, "public");
if (fs.existsSync(PUBLIC_DIR)) {
app.use(express.static(path.resolve(__dirname, "public")));
app.get("*", (_req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

  // SPA fallback (เช่น React Router)
  app.get("*", (_req, res) =>
    res.sendFile(path.join(PUBLIC_DIR, "index.html"))
  );
}

// health
app.get("/health", async (_req, res) => {
  try {
    res.json({ ok: true, now: await ping() });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});
app.get("/healthz", (_req, res) => res.status(200).json({ ok: true }));

const PORT = Number(process.env.PORT || 10783);
app.listen(PORT, "0.0.0.0", () =>
  console.log(`API/Web running at http://localhost:${PORT}`)
);
