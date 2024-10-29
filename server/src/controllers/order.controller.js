import { pool } from "../db/connection.js";
import { storePerson } from "./person.controller.js";
import { getNotebookDetails } from "./product.controller.js";

export const getAllOrders = async (req, res) => {
  try {
    const [response] = await pool.query("SELECT * FROM Pedido");
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error de la base de datos",
      error: error ?? error.message ?? "Error desconocido",
    });
  }
};

export const addOrderToLoggedUser = async (req, res) => {
  const userId = req.userId;
  const accountId = req.accountId;

  const { notebooksId } = req.body;

  const detailsNotebooks = await getNotebookDetails(notebooksId);

  if (!userId) {
    return res.status(404).json({ error: "User not found" });
  }

  const lastOrderNumber = await getLastOrderNumber();

  let orderNumber = 1;
  if (lastOrderNumber) {
    orderNumber = lastOrderNumber + 1;
  }

  const currentDate = new Date();
  const releseDate = new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000); // 3days

  try {
    const orderId = await insertOrder(
      orderNumber,
      currentDate,
      releseDate,
      0,
      detailsNotebooks.totalPriceNotebooks,
      userId,
      accountId
    );

    detailsNotebooks.orderNotebook.map(async (notebook) => {
      await addNotebookToAnOrder(orderId, notebook.id, notebook.times);
    });
    const code = generateOrderCode(orderId);

    return res.status(201).json({
      message: "Order added successfully",
      orderId: orderId,
      codeOrder: code,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message ?? "Server error" });
  }
};

export const addOrderWithoutUserLogged = async (req, res) => {
  const { name, ci, lastname, phoneNumber, role, notebooksId } = req.body;
  const personId = await storePerson(name, ci, lastname, phoneNumber, role);

  if (!personId) {
    return res.status(404).json({ error: "Person not found" });
  }

  const detailsNotebooks = await getNotebookDetails(notebooksId);
  const lastOrderNumber = await getLastOrderNumber();

  let orderNumber = 1;
  if (lastOrderNumber) {
    orderNumber = lastOrderNumber + 1;
  }

  const currentDate = new Date();
  const releseDate = new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000); // 3days

  try {
    const orderId = await insertOrder(
      orderNumber,
      currentDate,
      releseDate,
      0,
      detailsNotebooks.totalPriceNotebooks,
      personId,
      null
    );

    detailsNotebooks.orderNotebook.map(async (notebook) => {
      await addNotebookToAnOrder(orderId, notebook.id, notebook.times);
    });
    const code = generateOrderCode(orderId);

    return res.status(201).json({
      message: "Order added successfully",
      orderId: orderId,
      codeOrder: code,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message ?? "Server error" });
  }
};

const addNotebookToAnOrder = async (orderId, notebookId, times) => {
  const query = `INSERT INTO Pedido_Cuaderno (id_pedido, id_cuaderno, cantidad) VALUES (?,?,?)`;
  try {
    await pool.query(query, [orderId, notebookId, times]);
    return;
  } catch (error) {
    console.error(error);
  }
};

const generateOrderCode = (orderId) => {
  const buffer = Buffer.from(String(orderId));
  const code = buffer.toString("base64");
  // console.log(`Codificado ${code}`);
  return code;
};

const verifyOrderCode = (code) => {
  const buffer = Buffer.from(code, "base64");
  const orderId = buffer.toString("utf-8");
  // console.log(`Decodificado ${orderId}`);

  // const query = "SELECT id FROM Pedido WHERE id = ";
  // const [[response]] = await pool.query(query, []);
  // return;
};

const getLastOrderNumber = async () => {
  const [[order]] = await pool.query(
    "SELECT cod_pedido FROM Pedido ORDER BY id DESC LIMIT 1"
  );
  return order.cod_pedido;
};

const insertOrder = async (
  orderNumber,
  currentDate,
  releseDate,
  status,
  totalPrice,
  userId,
  accountId
) => {
  const query = `INSERT INTO Pedido (cod_pedido, fecha_pedido, fecha_recojo, estado, total, id_persona, id_cuenta) 
  VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const [{ insertId }] = await pool.query(query, [
    orderNumber,
    currentDate,
    releseDate,
    status,
    totalPrice,
    userId,
    accountId,
  ]);
  return insertId;
};
