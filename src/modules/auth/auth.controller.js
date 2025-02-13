// src/modules/auth/auth.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../../db/models/index.js";
import { registerValidation, loginValidation } from "./auth.validation.js";
import { asyncHandler } from "../../middleware/catchError.js";
import { sendWelcomeEmail } from "../../utils/sendEmail.js"

export const register =asyncHandler( async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details.map((err) => err.message) });
  }

  const { username, email, password } = req.body;

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, email, password: hashedPassword });

  await sendWelcomeEmail(newUser.email, newUser.username);
  res.status(201).json({ message: "User registered successfully" });
});


export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",  
  });

  res.json({ message: "Login successful", token });
});
