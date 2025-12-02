const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Personal_transaction",
    password: "Rushi@976363",
    port: 5432
});

module.exports = pool;

