const { body, validationResult } = require('express-validator');
/**
 * 
 * @returns 
 * 
 */
const userValidationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('age').optional().isInt({ min: 1 }).withMessage('Age must be positive integer'),
];

/**
userValidationRules() -> returns an array of validation checks (e.g., name not empty, email is valid).

validate -> middleware that runs after the rules and checks if there are any errors.

If errors exist -> sends 400 Bad Request with the error array.

If no errors -> calls next() to continue to the controller.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  res.status(400).json({ errors: errors.array() });
};

module.exports = { userValidationRules, validate };
