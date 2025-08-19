// users.controller.js (ใหม่)
const { query } = require("../db");

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await query("SELECT * FROM users WHERE id = $1", [id]);
    if (!rows.length) return res.status(404).json({ message: "not found" });
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
