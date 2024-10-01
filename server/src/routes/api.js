import { Router } from "express";
import { testRouter } from "./test.routes.js";
import { productRouter } from "./product.routes.js";

export const api = Router();

api.use("/test", testRouter);
api.use("/products", productRouter);
