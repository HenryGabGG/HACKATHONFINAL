const axios = require('axios');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel'); // Creamos un modelo de orden que guardará la información de la compra
const Product = require('../models/productModel');

const culqiSecretKey = process.env.CULQI_SECRET_KEY;

exports.processPayment = async (req, res) => {
  const { token, amount } = req.body;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const response = await axios.post('https://api.culqi.com/v2/charges', {
      amount: amount,
      currency_code: 'PEN',
      email: req.user.email,
      source_id: token
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${culqiSecretKey}`
      }
    });

    if (response.data.object === 'charge') {
      const order = new Order({
        user: userId,
        items: cart.items,
        totalPrice: cart.totalPrice,
        discount: cart.discount,
        finalPrice: cart.finalPrice,
        paymentStatus: 'paid',
        chargeId: response.data.id
      });

      await order.save();

      // Clear the cart
      cart.items = [];
      cart.totalPrice = 0;
      cart.discount = 0;
      cart.finalPrice = 0;
      cart.couponUsed = '';
      await cart.save();

      res.status(200).json(order);
    } else {
      res.status(400).json({ message: 'Payment failed', error: response.data });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment', error: error.message });
  }
};