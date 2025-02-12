// db/models/index.js
import { sequelize, connectDB } from "../connection.js";
import { asyncHandler } from "../../src/middleware/catchError.js";
import User from "./user.model.js";
import Project from "./project.model.js";
import Task from "./task.model.js";

export const syncDB = asyncHandler(async () => {
  await connectDB();
  await sequelize.sync({ alter: true });
  console.log("All models were synchronized successfully.");
});

export { User, Project, Task };