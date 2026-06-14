const express = require('express');
const bookingController = require('../controllers/bookingController');
const { createBookingValidator, updateBookingStatusValidator } = require('../validators/bookingValidator');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .post(createBookingValidator, bookingController.createBooking)
  .get(bookingController.getAllBookings);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(restrictTo('Admin'), updateBookingStatusValidator, bookingController.updateBookingStatus)
  .delete(restrictTo('Admin'), bookingController.deleteBooking);

module.exports = router;
