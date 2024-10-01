import { pool } from "../db/connection.js";

export const createProduct = async (req, res) => {
  const [result] = await pool.query(
    `INSERT INTO product (name, description, price) VALUES ("cuaderno artesanal", "Pequeño cuaderno", 1.20)`
  );
  res.json(result);
};

export const updateProduct = (req, res) => {
  res.json("Product updated");
};

export const getAllProducts = async (req, res) => {
  const [result] = await pool.query("SELECT * FROM product");
  res.json(result);
};
