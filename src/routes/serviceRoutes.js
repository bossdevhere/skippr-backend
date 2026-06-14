const express = require('express');
const serviceController = require('../controllers/serviceController');
const { serviceValidator } = require('../validators/serviceValidator');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getService);

// Admin only routes
router.use(protect);
router.use(restrictTo('Admin'));

router.post('/', serviceValidator, serviceController.createService);
router.patch('/:id', serviceValidator, serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;
