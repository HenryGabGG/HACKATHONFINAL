// controllers/couponController.js
const Coupon = require('../models/couponModel');

// Crear cupón
exports.createCoupon = async (req, res) => {
  try {
    const { code, discount, expirationDate } = req.body;

    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ message: 'Coupon code already exists' });
    }

    const newCoupon = new Coupon({
      code,
      discount,
      expirationDate
    });
    
    const savedCoupon = await newCoupon.save();
    res.status(201).json(savedCoupon);
  } catch (error) {
    res.status(500).json({ message: 'Error creating coupon', error });
  }
};

// Obtener todos los cupones
exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching coupons', error });
  }
};

// Obtener cupón por ID
exports.getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching coupon', error });
  }
};

// Actualizar cupón
exports.updateCoupon = async (req, res) => {
  try {
    const { code, discount, expirationDate } = req.body;
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      { code, discount, expirationDate },
      { new: true }
    );
    if (!updatedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.status(200).json(updatedCoupon);
  } catch (error) {
    res.status(500).json({ message: 'Error updating coupon', error });
  }
};

// Eliminar cupón
exports.deleteCoupon = async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!deletedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.status(200).json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting coupon', error });
  }
};