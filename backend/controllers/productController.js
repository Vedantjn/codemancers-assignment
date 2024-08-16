const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const image = req.file ? req.file.path : null;

    const product = new Product({
      title,
      description,
      price,
      image
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const image = req.file ? req.file.path : undefined;

    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    if (image) product.image = image;

    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};