const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/products', homeController.getProducts);
router.post('/products', protect, admin, homeController.createProduct);

module.exports = router;