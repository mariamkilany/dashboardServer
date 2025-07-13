const pool = require("../config/db");

const findByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT id, name, email, password FROM users WHERE email = ?",
    [email]
  );
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
  const [rows] = await pool.query("SELECT id, name, email FROM users");
  return rows;
};

const findById = async (id) => {
  const [rows] = await pool.query(
    "SELECT id, name, email FROM users WHERE id = ?",
    [id]
  );
  return rows[0];
};

const update = async (id, { name, email, password }) => {
  let query = "UPDATE users SET ";
  let params = [];

  if (name) {
    query += "name = ?, ";
    params.push(name);
  }
  if (email) {
    query += "email = ?, ";
    params.push(email);
  }
  if (password) {
    query += "password = ?, ";
    params.push(password);
  }

  // Remove the last comma and space
  query = query.slice(0, -2);
  query += " WHERE id = ?";
  params.push(id);

  const [result] = await pool.query(query, params);

  if (result.affectedRows > 0) {
    // Return the updated user (without password)
    return await findById(id);
  }
  return null;
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
  update,
  delete: deleteUser,
};
