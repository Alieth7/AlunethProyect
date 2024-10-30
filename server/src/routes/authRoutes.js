import { Router } from "express";
import {
  login,
  newRegister,
  register,
} from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/newRegister", newRegister);
