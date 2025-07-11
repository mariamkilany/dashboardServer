const mysql = require("mysql2/promise");
// require("dotenv").config({ path: __dirname + "/../.env" });

console.log("Connecting to DB with:");
console.log("HOST:", process.env.DB_HOST);
console.log("USER:", process.env.DB_USER);
console.log("PASSWORD:", process.env.DB_PASSWORD ? "***" : "(empty)");
console.log("DB NAME:", process.env.DB_NAME);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool
  .getConnection()
  .then((conn) => {
    console.log("✅ DB connected with user:", process.env.DB_USER);
    conn.release();
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err.message);
  });

module.exports = pool;
