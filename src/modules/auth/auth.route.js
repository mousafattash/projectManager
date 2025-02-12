// src/modules/auth/auth.route.js
import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { asyncHandler } from "../../middleware/catchError.js";

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));

export default router;