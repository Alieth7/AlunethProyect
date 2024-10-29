import { pool } from "../db/connection.js";

export const getAllPersons = async (req, res) => {
  try {
    const query = `SELECT * FROM Persona`;
    const [result] = await pool.query(query);
    res.json(result);
  } catch (error) {
    console.error(error.message ?? error);
    res.status(500).json({
      message: error.message ?? error ?? "Error desconocido",
    });
  }
};

export const addPerson = async (req, res) => {
  const { nombre, ci, apellido, nro_celular, rol } = req.body;

  if (!nombre || !ci || !apellido || !nro_celular || !rol) {
    res.status(422).json({ message: "Faltan campos requerido" });
    return;
  }

  try {
    const newPersonId = await storePerson(
      nombre,
      ci,
      apellido,
      nro_celular,
      rol
    );

    if (!newPersonId) {
      return res.status(500).json({ message: "Add person failed" });
    }

    res.status(200).json({
      message: "Added person",
    });
  } catch (error) {
    console.error(error.message ?? error);
    res.status(500).json({
      message: error.message ?? error ?? "Error desconocido",
    });
  }
};

export const storePerson = async (nombre, ci, apellido, nro_celular, rol) => {
  try {
    const query = `INSERT INTO Persona (nombre,ci,apellido,nro_celular,rol) 
  VALUES (?,?,?,?,?)`;
    const [result] = await pool.query(query, [
      nombre,
      ci,
      apellido,
      nro_celular,
      rol,
    ]);

    return result.insertId;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getClients = async (req, res) => {
  try {
    const query = `SELECT * FROM Persona WHERE rol = "Cliente"`;
    const [result] = await pool.query(query);
    res.json(result);
  } catch (error) {
    console.error(error.message ?? error);
    res.status(500).json({
      message: error.message ?? error ?? "Error desconocido",
    });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const query = `SELECT * FROM Persona WHERE rol = "Admin"`;
    const [result] = await pool.query(query);
    res.json(result);
  } catch (error) {
    console.error(error.message ?? error);
    res.status(500).json({
      message: error.message ?? error ?? "Error desconocido",
    });
  }
};
