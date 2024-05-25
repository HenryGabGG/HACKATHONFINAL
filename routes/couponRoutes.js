const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/coupons', protect, admin, couponController.createCoupon); // Ruta protegida
router.get('/coupons', protect, admin, couponController.getCoupons);
router.get('/coupons/:id', protect, admin, couponController.getCouponById);
router.put('/coupons/:id', protect, admin, couponController.updateCoupon);
router.delete('/coupons/:id', protect, admin, couponController.deleteCoupon);

module.exports = router;