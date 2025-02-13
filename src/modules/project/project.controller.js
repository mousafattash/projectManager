//src/modules/project/project.controller.js
import { asyncHandler } from "../../middleware/catchError.js";
import { createProjectValidation, updateProjectValidation } from './project.validation.js';
import {Project} from "../../../db/models/index.js";
import {User} from "../../../db/models/index.js";

// Create a new project
export const createProject = asyncHandler(async (req, res) => {
    const { error } = createProjectValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details.map((err) => err.message) });
    }
  
    const { name, description, dueDate, priority } = req.body;
  
    // Ensure userId is coming from the token (and is not null)
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }
  
    const newProject = await Project.create({
        name,
        description,
        dueDate,
        priority,
        userId: req.user.id,  // Ensure it matches the actual column name
      });
  
    res.status(201).json({ message: "Project created successfully", project: newProject });
  });

// Get details of a project
export const getProjectDetails = asyncHandler(async (req, res) => {
  const projectId = req.params.projectId;

  const project = await Project.findByPk(projectId, {
    include: [User], // Include project members or other related data
  });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.status(200).json(project);
});

// Update project details
export const updateProject = asyncHandler(async (req, res) => {
  const { error } = updateProjectValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details.map((err) => err.message) });
  }

  const projectId = req.params.projectId;
  const project = await Project.findByPk(projectId);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  // Ensure the user is the owner of the project
  if (project.userId !== req.user.id) {
    return res.status(403).json({ message: "You are not authorized to update this project" });
  }

  const { name, description, dueDate, priority } = req.body;
  project.name = name || project.name;
  project.description = description || project.description;
  project.dueDate = dueDate || project.dueDate;
  project.priority = priority || project.priority;

  await project.save();

  res.status(200).json({ message: "Project updated successfully", project });
});

// Delete a project
export const deleteProject = asyncHandler(async (req, res) => {
  const projectId = req.params.projectId;
  const project = await Project.findByPk(projectId);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  // Ensure the user is the owner of the project
  if (project.userId !== req.user.id) {
    return res.status(403).json({ message: "You are not authorized to delete this project" });
  }

  await project.destroy();

  res.status(200).json({ message: "Project deleted successfully" });
});

// Get all projects of a user
export const getAllProjects = asyncHandler(async (req, res) => {
    // Ensure req.user exists and extract user ID from the token
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }
  
    const userId = req.user.id;
  
    const projects = await Project.findAll({
      where: { userId }, // Fetch projects where the user ID from the token matches
      include: [User], // Include related user data if necessary
    });
  
    res.status(200).json(projects);
  });