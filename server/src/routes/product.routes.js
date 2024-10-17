import { Router } from "express";
import multer from "multer";
import {
  createProduct,
  getAllProducts,
  getCustoms,
  getImagePerProductId,
} from "../controllers/product.controller.js";
import { authorizedRoles, verifyToken } from "../middleware/auth.middleware.js";

const storage = multer.memoryStorage();
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

// Not finished
productRouter.get(
  "/getImage/:productId",
  verifyToken,
  authorizedRoles("Cliente", "Admin"),
  getImagePerProductId
);
