import { Router } from "express";
import { testRouter } from "./test.routes.js";
import { productRouter } from "./product.routes.js";
import { personRouter } from "./person.router.js";
import { ordersRouter } from "./order.router.js";
import { authRouter } from "./authRoutes.js";

export const api = Router();

api.use("/auth", authRouter);
api.use("/products", productRouter);
api.use("/person", personRouter);
api.use("/order", ordersRouter);

api.use("/test", testRouter);
