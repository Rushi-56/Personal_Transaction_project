const express = require("express");
const pool = require("../db");

const router = express.Router();

// 1️⃣ UPDATE FIRST
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { amount, type, note, date } = req.body;

  const result = await pool.query(
    `UPDATE transactions 
     SET amount = $1, type = $2, note = $3, date = $4 
     WHERE transaction_id = $5 RETURNING *`,
    [amount, type, note, date, id]
  );

  res.json(result.rows[0]);
});

// 2️⃣ ADD
router.post("/add", async (req, res) => {
  const { user_id, amount, type, note, date } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO transactions (user_id, amount, type, note, date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, amount, type, note, date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3️⃣ DELETE
router.delete("/delete/:id", async (req, res) => {
  await pool.query("DELETE FROM transactions WHERE transaction_id = $1", [req.params.id]);
  res.json({ message: "Deleted successfully" });
});

// 4️⃣ BALANCE
router.get("/balance/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const result = await pool.query(
    `SELECT
       COALESCE(SUM(CASE WHEN type='income' THEN amount END),0) AS total_income,
       COALESCE(SUM(CASE WHEN type='expense' THEN amount END),0) AS total_expense,
       COALESCE(SUM(CASE WHEN type='income' THEN amount END),0)
       - COALESCE(SUM(CASE WHEN type='expense' THEN amount END),0) AS balance
     FROM transactions WHERE user_id=$1`,
    [user_id]
  );
  res.json(result.rows[0]);
});

// 5️⃣ GET ALL — MUST BE LAST
router.get("/:user_id", async (req, res) => {
  const result = await pool.query(
    `SELECT transaction_id, user_id, amount, type, note, date FROM transactions
     WHERE user_id=$1 ORDER BY date DESC`,
    [req.params.user_id]
  );
  res.json(result.rows);
});

module.exports = router;
