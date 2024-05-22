const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/products', homeController.getProducts);
router.post('/products', homeController.createProduct);

module.exports = router;