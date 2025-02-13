import Joi from 'joi';

// Validation schema for creating a project
export const createProjectValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(5).required(),
    dueDate: Joi.date().optional(),
    priority: Joi.string().valid('Low', 'Medium', 'High').default('Medium'),
  });

  return schema.validate(data);
};

// Validation schema for updating a project
export const updateProjectValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).optional(),
    description: Joi.string().min(5).optional(),
    dueDate: Joi.date().optional(),
    priority: Joi.string().valid('Low', 'Medium', 'High').optional(),
  });

  return schema.validate(data);
};