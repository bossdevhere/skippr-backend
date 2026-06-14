const { validationResult } = require('express-validator');
const bookingService = require('../services/bookingService');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');

exports.createBooking = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(400, errors.array()[0].msg));
  }

  const booking = await bookingService.createBooking(req.user.id, req.body);

  res.status(201).json({
    status: 'success',
    data: { booking }
  });
});

exports.getAllBookings = asyncHandler(async (req, res, next) => {
  const bookings = await bookingService.getAllBookings(req.user);

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: { bookings }
  });
});

exports.getBooking = asyncHandler(async (req, res, next) => {
  const booking = await bookingService.getBookingById(req.params.id, req.user);

  res.status(200).json({
    status: 'success',
    data: { booking }
  });
});

exports.updateBookingStatus = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(400, errors.array()[0].msg));
  }

  const booking = await bookingService.updateBookingStatus(req.params.id, req.body.status);

  res.status(200).json({
    status: 'success',
    data: { booking }
  });
});

exports.deleteBooking = asyncHandler(async (req, res, next) => {
  await bookingService.deleteBooking(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});
