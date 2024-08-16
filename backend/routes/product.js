const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', auth, roleCheck('super_admin'), upload.single('image'), createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', auth, roleCheck('super_admin'), upload.single('image'), updateProduct);
router.delete('/:id', auth, roleCheck('super_admin'), deleteProduct);

module.exports = router;