// api/db.js
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PGHOST || "postgres",
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  database: process.env.PGDATABASE || "appdb",
  user: process.env.PGUSER || "appuser",
  password: process.env.PGPASSWORD || "apppass",
  ssl: false,
});

// helper: แบบ promise
const query = (text, params) => pool.query(text, params);

// ตัวอย่างทดสอบ
async function ping() {
  const { rows } = await pool.query("SELECT NOW() as now");
  return rows[0].now;
}

module.exports = { pool, query, ping };
