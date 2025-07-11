const pool = require("../config/db");

const findByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

const create = async ({ name, email, password }) => {
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password) VALUES (?,?,?)",
    [name, email, password]
  );
  return { id: result.insertId, name, email };
};

const getAll = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
};

const findById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

const deleteUser = async (id) => {
  const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

module.exports = {
  findByEmail,
  create,
  getAll,
  findById,
  delete: deleteUser,
};
