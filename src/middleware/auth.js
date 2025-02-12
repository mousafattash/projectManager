// src/middleware/auth.js
import jwt from "jsonwebtoken";
import { asyncHandler } from "./catchError.js";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const decoded = jwt.verify(token, "tariq-shreem");
  req.user = decoded;
  next();
});