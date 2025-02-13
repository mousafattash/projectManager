import express from 'express';
import { createProject, getProjectDetails, updateProject, deleteProject, getAllProjects } from './project.controller.js';
import { protect } from '../../middleware/auth.js';

const router = express.Router();


router.post('/', protect, createProject); // Create a new project
router.get('/:projectId', protect, getProjectDetails); // Get project details
router.put('/:projectId', protect, updateProject); // Update project details
router.delete('/:projectId', protect, deleteProject); // Delete a project
router.get('/', protect, getAllProjects); // Get all projects for the logged-in user

export default router;