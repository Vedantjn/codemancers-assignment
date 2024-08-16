const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');  // Add this line
const emailService = require('../utils/emailService');

exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const order = new Order({
      user: req.user.id,
      items: cart.items,
      shippingAddress,
      total: cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0)
    });

    await order.save();

    // Clear the cart
    cart.items = [];
    await cart.save();

    // Send confirmation email
    const user = await User.findById(req.user.id);
    if (user && user.email) {
      await emailService.sendOrderConfirmation(user.email, order);
    }

    res.json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};