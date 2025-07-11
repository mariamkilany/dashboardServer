const pool = require("../config/db");

const getAll = async (userId) => {
  const [rows] = await pool.query("SELECT * FROM products WHERE user_id = ?", [
    userId,
  ]);
  return rows;
};

const getById = async (id, userId) => {
  const [rows] = await pool.query(
    "SELECT * FROM products WHERE id = ? AND user_id = ?",
    [id, userId]
  );
  return rows[0];
};

const create = async ({ name, description, price }, userId) => {
  const [result] = await pool.query(
    "INSERT INTO products (name, description, price, user_id) VALUES (?,?,?,?)",
    [name, description, price, userId]
  );
  return { id: result.insertId, name, description, price };
};

const update = async (id, { name, description, price }, userId) => {
  await pool.query(
    "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ? AND user_id = ?",
    [name, description, price, id, userId]
  );
  return getById(id, userId);
};

const remove = async (id, userId) => {
  await pool.query("DELETE FROM products WHERE id = ? AND user_id = ?", [
    id,
    userId,
  ]);
};

module.exports = { getAll, getById, create, update, remove };
