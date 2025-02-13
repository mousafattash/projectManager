import Joi from 'joi';

export const createTaskValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().allow('').optional(),
    dueDate: Joi.date().optional(),
    priority: Joi.string().valid('Low', 'Medium', 'High').default('Medium'),
    // Use enum values that match the database: 'to-do', 'in_progress', 'done'
    status: Joi.string().valid('to-do', 'in_progress', 'done').default('to-do')
  });

  return schema.validate(data, { abortEarly: false });
};

export const updateTaskValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).optional(),
    description: Joi.string().allow('').optional(),
    dueDate: Joi.date().optional(),
    priority: Joi.string().valid('Low', 'Medium', 'High').optional(),
    status: Joi.string().valid('to-do', 'in_progress', 'done').optional()
  });

  return schema.validate(data, { abortEarly: false });
};

// New validation for updating only the task status
export const updateTaskStatusValidation = (data) => {
  const schema = Joi.object({
    status: Joi.string().valid('to-do', 'in_progress', 'done').required()
  });

  return schema.validate(data, { abortEarly: false });
};
