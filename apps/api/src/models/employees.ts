import Joi from 'joi';

export const employeeSchema = Joi.object({
  firstName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.pattern.base': 'First name must contain only letters',
      'string.empty': 'Please enter first name.',
    }),
  lastName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.pattern.base': 'Last name must contain only letters',
    }),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(120),
});
