const { body } = require('express-validator');

exports.serviceValidator = [
  body('name').notEmpty().withMessage('Service name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isDecimal().withMessage('Valid price is required')
];
