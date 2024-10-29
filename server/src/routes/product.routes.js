import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {
  createProduct,
  getAllProducts,
  getCustoms,
} from "../controllers/product.controller.js";
import { authorizedRoles, verifyToken } from "../middleware/auth.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../public/cuadernos");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export const productRouter = Router();

productRouter.get(
  "/getAll",
  verifyToken,
  authorizedRoles("Cliente", "Admin"),
  getAllProducts
);
productRouter.get(
  "/getCustoms",
  verifyToken,
  authorizedRoles("Cliente", "Admin"),
  getCustoms
);

productRouter.post(
  "/add",
  verifyToken,
  authorizedRoles("Cliente", "Admin"),
  upload.single("image"),
  createProduct
);

// Just in case in a future work
// productRouter.get(
//   "/getImage/:productId",
//   verifyToken,
//   authorizedRoles("Cliente", "Admin"),
//   getImagePerProductId
// );
