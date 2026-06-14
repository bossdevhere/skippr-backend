const { body, param } = require('express-validator');

exports.createBookingValidator = [
  body('service_id').isInt().withMessage('Valid Service ID is required'),
  body('customer_name').notEmpty().withMessage('Customer name is required'),
  body('mobile').notEmpty().withMessage('Mobile number is required'),
  body('unit_number').notEmpty().withMessage('Unit number is required'),
  body('service_name').notEmpty().withMessage('Service name is required'),
  body('booking_date').isDate().withMessage('Valid booking date is required (YYYY-MM-DD)'),
  body('time_slot').notEmpty().withMessage('Time slot is required'),
  body('address').notEmpty().withMessage('Address is required')
];

exports.updateBookingStatusValidator = [
  param('id').isInt().withMessage('Valid Booking ID is required'),
  body('status').isIn(['Pending', 'Assigned', 'Completed']).withMessage('Invalid status')
];
