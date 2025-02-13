// db/connection.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { asyncHandler } from "../src/middleware/catchError.js";

dotenv.config();
// console.log("DB_PASS:", process.env.DB_PASS);

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "postgres",
});

export const connectDB = asyncHandler(async () => {
  await sequelize.authenticate();
  console.log("Database connected successfully.");
});