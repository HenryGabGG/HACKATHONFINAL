const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
  try {
    const { category, priceRange, search } = req.query;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      query.price = { $gte: min, $lte: max };
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

exports.createProduct = async (req, res) => {
    try {
      const { name, description, category, price, stock, imageUrl, coupon } = req.body;
      const newProduct = new Product({
        name,
        description,
        category,
        price,
        stock,
        imageUrl,
        coupon
      });
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error });
    }
  };