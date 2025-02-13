import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { asyncHandler } from "../src/middleware/catchError.js";

dotenv.config();

export const sequelize = new Sequelize(
  "neondb", // Database name
  "neondb_owner", // Username
  "npg_ng8U4Wphoswq", // Password
  {
    host: "ep-restless-morning-a80prz0x-pooler.eastus2.azure.neon.tech",
    dialect: "postgres",
    port: 5432, // Default PostgreSQL port
    dialectOptions: {
      ssl: {
        require: true, // Required for Neon DB
        rejectUnauthorized: false, // Allows self-signed certificates
      },
    },
  }
);

export const connectDB = asyncHandler(async () => {
  await sequelize.authenticate();
  console.log("Database connected successfully.");
});
