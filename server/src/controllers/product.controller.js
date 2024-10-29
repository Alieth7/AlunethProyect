import { pool } from "../db/connection.js";

export const createProduct = async (req, res) => {
  try {
    const { codigo_catalogo, precio, personalizado, nombre, especificaciones } =
      req.body;
    const { filename } = req.file;

    const imageUrl = `http://${req.headers.host}/public/cuadernos/${filename}`;

    const sql = `INSERT INTO Cuaderno (codigo_catalogo, precio, personalizado, nombre, especificaciones, image) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.query(sql, [
      codigo_catalogo,
      precio,
      personalizado,
      nombre,
      especificaciones,
      imageUrl,
    ]);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message || "Error en la base de datos.",
      errorCode: error.errno,
    });
  }
};

export const getAllProducts = async (req, res) => {
  const [result] = await pool.query("SELECT * FROM Cuaderno");
  res.json(result);
};

export const getCustoms = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM Cuaderno WHERE personalizado = 1"
    );
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Error en la base de datos",
      error: error.message || "Error desconocido",
    });
  }
};

// In case in a future work
// export const getImagePerProductId = async (req, res) => {
//   const productId = req.params.productId;

//   if (!productId) {
//     return res.status(422).json({ message: "Campos requeridos" });
//   }

//   try {
//     const query = `SELECT image FROM Cuaderno WHERE id = ?`;
//     const [[result]] = await pool.query(query, [productId]);
//     // console.log(result);
//     const image = result.image;
//     res.writeHead(200, { "Content-Type": "image/png" });
//     // res.sendFile(image, "binary");
//     res.send(image);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: error ?? error.message ?? "Error de servidor" });
//   }
// };

export const countRepeated = (notebooks) => {
  const times = {};
  notebooks.forEach((each) => {
    times[each] = (times[each] || 0) + 1;
  });
  return times;
};

export const getSinglePrice = async (idNotebook) => {
  try {
    const query = `SELECT precio FROM Cuaderno WHERE id = ?`;
    const [[price]] = await pool.query(query, [idNotebook]);
    return price;
  } catch (error) {
    console.error(error);
  }
};

export const getNotebookDetails = async (notebooksId) => {
  const notebooksRepeated = countRepeated(notebooksId);
  const orderNotebook = [];

  for (const [idNotebook, times] of Object.entries(notebooksRepeated)) {
    const price = await getSinglePrice(idNotebook);
    const totalPrice = Math.round(price.precio * times * 100) / 100;
    const notebookDetail = {
      id: idNotebook,
      times: times,
      total: totalPrice,
    };
    orderNotebook.push(notebookDetail);
  }

  let totalPriceNotebooks = 0;
  orderNotebook.forEach((each) => {
    totalPriceNotebooks = totalPriceNotebooks + each.total;
  });
  totalPriceNotebooks = Math.round(totalPriceNotebooks * 100) / 100;
  const details = {
    orderNotebook: orderNotebook,
    totalPriceNotebooks: totalPriceNotebooks,
  };
  return details;
};
