// src/modules/task/task.controller.js
import { asyncHandler } from "../../middleware/catchError.js";
import { createTaskValidation, updateTaskValidation } from "./task.validation.js";
import { Task } from "../../../db/models/index.js";

// Create a new task under a project
export const createTask = asyncHandler(async (req, res) => {
  const { error } = createTaskValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details.map(err => err.message) });
  }

  const { title, description, dueDate, priority, status } = req.body;
  const projectId = req.params.projectId; // Extract projectId from URL

  // Create new task with the provided projectId
  const newTask = await Task.create({
    title,
    description,
    dueDate,
    priority,
    status,
    projectId
  });

  res.status(201).json({ message: "Task created successfully", task: newTask });
});

// Get details of a specific task
export const getTaskDetails = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;

  const task = await Task.findOne({ where: { id: taskId, projectId } });
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json(task);
});

// Update an existing task (including its status)
export const updateTask = asyncHandler(async (req, res) => {
  const { error } = updateTaskValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details.map(err => err.message) });
  }

  const { projectId, taskId } = req.params;
  const task = await Task.findOne({ where: { id: taskId, projectId } });
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  // Update task fields if provided; otherwise, keep current values
  const { title, description, dueDate, priority, status } = req.body;
  task.title = title || task.title;
  task.description = description || task.description;
  task.dueDate = dueDate || task.dueDate;
  task.priority = priority || task.priority;
  task.status = status || task.status;

  await task.save();

  res.status(200).json({ message: "Task updated successfully", task });
});

// Delete a task
export const deleteTask = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;
  const task = await Task.findOne({ where: { id: taskId, projectId } });
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  await task.destroy();

  res.status(200).json({ message: "Task deleted successfully" });
});

// Get all tasks for a specific project
export const getAllTasks = asyncHandler(async (req, res) => {
  const projectId = req.params.projectId;

  const tasks = await Task.findAll({ where: { projectId } });
  res.status(200).json(tasks);
});
