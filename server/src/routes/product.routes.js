import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.controller.js";

export const productRouter = Router();

productRouter.get("/getAll", getAllProducts);
productRouter.post("/add", createProduct);
productRouter.put("/update", updateProduct);
