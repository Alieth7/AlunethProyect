import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config.js";

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    req.role = decoded.role;
    req.accountId = decoded.accountId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const authorizedRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};
