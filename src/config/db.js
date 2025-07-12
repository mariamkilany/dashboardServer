const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool(
  process.env.DB_URL || {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }
);

pool
  .getConnection()
  .then((conn) => {
    console.log(
      "✅ DB connected with user:",
      process.env.DB_USER || process.env.DATABASE_URL
    );
    conn.release();
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err.message);
  });

module.exports = pool;
