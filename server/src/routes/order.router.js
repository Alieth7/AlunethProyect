import { Router } from "express";
import {
  getAllOrders,
  addOrderToLoggedUser,
  addOrderWithoutUserLogged,
} from "../controllers/order.controller.js";
import { authorizedRoles, verifyToken } from "../middleware/auth.middleware.js";

export const ordersRouter = Router();

ordersRouter.get(
  "/getAll",
  verifyToken,
  authorizedRoles("Admin"),
  getAllOrders
);

ordersRouter.post(
  "/addToLoggedUser",
  verifyToken,
  authorizedRoles("Cliente"),
  addOrderToLoggedUser
);

ordersRouter.post("/addWithoutUserLogged", addOrderWithoutUserLogged);
