import express from 'express';
import { createTask, getTaskDetails, updateTask, deleteTask, getAllTasks } from './task.controller.js';
import { protect } from '../../middleware/auth.js';

const router = express.Router({ mergeParams: true });
// Using mergeParams: true allows this router to access :projectId from a parent router

// Create a new task: POST /projects/:projectId/tasks
router.post('/', protect, createTask);

// Get all tasks for a project: GET /projects/:projectId/tasks
router.get('/', protect, getAllTasks);

// Get details of a specific task: GET /projects/:projectId/tasks/:taskId
router.get('/:taskId', protect, getTaskDetails);

// Update a task: PUT /projects/:projectId/tasks/:taskId
router.put('/:taskId', protect, updateTask);

// Update task status only: PATCH /projects/:projectId/tasks/:taskId/status
router.patch('/:taskId/status', protect, updateTask);

// Delete a task: DELETE /projects/:projectId/tasks/:taskId
router.delete('/:taskId', protect, deleteTask);

export default router;
