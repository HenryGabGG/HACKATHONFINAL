const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.post('/add', protect, cartController.addToCart);
router.post('/remove', protect, cartController.removeFromCart);
router.post('/apply-coupon', protect, cartController.applyCoupon);

module.exports = router;