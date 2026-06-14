const dashboardService = require('../services/dashboardService');
const asyncHandler = require('../utils/asyncHandler');

exports.getStats = asyncHandler(async (req, res, next) => {
  const stats = await dashboardService.getStats(req.user);

  res.status(200).json({
    status: 'success',
    data: { stats }
  });
});
