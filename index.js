// index.js
import express from "express";
import { syncDB } from "./db/models/index.js";
import authRoutes from "./src/modules/auth/auth.route.js";
import projectRoutes from "./src/modules/project/project.route.js"
import taskRoutes from "./src/modules/task/task.route.js"
import { asyncHandler } from "./src/middleware/catchError.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Use routes
app.use("/users", authRoutes);
app.use("/projects", projectRoutes);
app.use("/projects/:projectId/tasks", taskRoutes);


// app.use("/tasks", taskRoutes);

const startServer = asyncHandler(async () => {
  await syncDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

startServer();