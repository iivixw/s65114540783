// api/db.js
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "postgres",
  port: Number(process.env.DB_PORT || 20783), // ← พอร์ตตนเอง
  user: process.env.DB_USER || "appuser",
  password: process.env.DB_PASS || "apppass",
  database: process.env.DB_NAME || "appdb",
});

async function ping() {
  const { rows } = await pool.query("select now() as now");
  return rows[0].now;
}

module.exports = { pool, ping };
