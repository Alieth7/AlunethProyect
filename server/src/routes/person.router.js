import { Router } from "express";
import {
  addPerson,
  getAdmins,
  getAllPersons,
  getClients,
} from "../controllers/person.controller.js";
import { authorizedRoles, verifyToken } from "../middleware/auth.middleware.js";

export const personRouter = Router();

personRouter.get(
  "/getAll",
  verifyToken,
  authorizedRoles("Admin"),
  getAllPersons
);
personRouter.get("/clients", verifyToken, authorizedRoles("Admin"), getClients);
personRouter.get("/admins", verifyToken, authorizedRoles("Admin"), getAdmins);

personRouter.post("/add", verifyToken, authorizedRoles("Admin"), addPerson);
