const { Pool } = require("pg");

// if DATABASE_URL exists → we are on Render
const isRender = !!process.env.DATABASE_URL;

let pool;

if (isRender) {
  // 🔹 Render PostgreSQL
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
} else {
  // 🔹 Your local PostgreSQL (same as you already use)
  pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Personal_transaction",
    password: "Rushi@976363",
    port: 5432,
  });
}

module.exports = pool;
