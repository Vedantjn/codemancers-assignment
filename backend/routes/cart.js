const express = require('express');
const router = express.Router();
const { addToCart, getCart, updateCartItem, removeFromCart } = require('../controllers/cartController');
const auth = require('../middleware/auth');

router.post('/', auth, addToCart);
router.get('/', auth, getCart);
router.put('/', auth, updateCartItem);
router.delete('/:productId', auth, removeFromCart);

module.exports = router;