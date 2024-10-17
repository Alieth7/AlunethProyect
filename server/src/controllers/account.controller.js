import { pool } from "../db/connection.js";

export const getAllAccounts = async (req, res) => {
  try {
    const query = "SELECT * FROM Cuenta";
    const [result] = await pool.query(query);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error ?? error.message ?? "Error desconocido",
    });
  }
};
