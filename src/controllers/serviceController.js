const serviceService = require('../services/serviceService');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');
const { validationResult } = require('express-validator');

exports.getAllServices = asyncHandler(async (req, res) => {
  const services = await serviceService.getAllServices();
  res.status(200).json({
    status: 'success',
    results: services.length,
    data: { services }
  });
});

exports.getService = asyncHandler(async (req, res) => {
  const service = await serviceService.getServiceById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: { service }
  });
});

exports.createService = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(400, errors.array()[0].msg));
  }
  const service = await serviceService.createService(req.body);
  res.status(201).json({
    status: 'success',
    data: { service }
  });
});

exports.updateService = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(400, errors.array()[0].msg));
  }
  const service = await serviceService.updateService(req.params.id, req.body);
  res.status(200).json({
    status: 'success',
    data: { service }
  });
});

exports.deleteService = asyncHandler(async (req, res) => {
  await serviceService.deleteService(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null
  });
});
