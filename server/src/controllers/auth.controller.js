import { SECRET_KEY, TOKEN_EXPIRE_IN } from "../../config.js";
import { pool } from "../db/connection.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    let query = `SELECT * FROM Cuenta WHERE nombre_usuario = ? AND contrasenia = ?`;
    const [[account]] = await pool.query(query, [username, password]);

    if (!account) {
      return res.status(401).json({ error: "Authentication failed." });
    }

    const passwordMatch = account.contrasenia === password;

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed." });
    }

    query = `SELECT rol FROM Persona WHERE Persona.id = ?`;
    const [[getRoleUser]] = await pool.query(query, [account.id_persona]);

    const token = jwt.sign(
      {
        userId: account.id_persona,
        accountId: account.id,
        username: account.nombre_usuario,
        role: getRoleUser.rol,
      },
      SECRET_KEY,
      {
        expiresIn: TOKEN_EXPIRE_IN,
      }
    );

    res.status(200).json({
      token,
      username: account.nombre_usuario,
      id: account.id_persona,
    });
  } catch (error) {
    res.status(500).json({ error: error.message ?? error ?? "Login failed." });
  }
};

export const register = async (req, res) => {
  try {
    const { username, password, personId } = req.body;

    if (!username || !password || !personId) {
      res.status(422).json({ message: "Faltan campos requerido" });
    }

    const [[account]] = await pool.query(
      `SELECT nro_cuenta FROM Cuenta ORDER BY id DESC LIMIT 1`
    );

    let accountNumber = 1;
    if (account) {
      accountNumber = account.nro_cuenta + 1;
    }

    const query =
      "INSERT INTO Cuenta (nro_cuenta,nombre_usuario, contrasenia, id_persona) VALUES (?,?,?,?)";
    const [result] = await pool.query(query, [
      accountNumber,
      username,
      password,
      personId,
    ]);
    res.status(200).json({
      message: "Cuenta registrada",
    });
  } catch (error) {
    res.status(500).json({ error: error.message ?? error ?? "Login failed." });
  }
};
