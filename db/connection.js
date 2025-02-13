// db/connection.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { asyncHandler } from "../src/middleware/catchError.js";

dotenv.config();
// console.log("DB_PASS:", process.env.DB_PASS);

export const sequelize = new Sequelize(freedb_projectsmanager, freedb_mousa, "pmfwG4G*XHasBG?", {
  host: sql.freedb.tech,
  dialect: "mysql",
});

export const connectDB = asyncHandler(async () => {
  await sequelize.authenticate();
  console.log("Database connected successfully.");
});