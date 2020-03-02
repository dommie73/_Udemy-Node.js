const { Router } = require('express');

const getAddProductForm = require('../controllers/admin/getAddProductForm');
const createProduct = require('../controllers/admin/createProduct');
const getProducts = require('../controllers/admin/getProducts');
const getEditProductForm = require('../controllers/admin/getEditProductForm');
const updateProduct = require('../controllers/admin/updateProduct');

const router = Router();

router.get('/add-product', getAddProductForm);
router.post('/add-product', createProduct);
router.get('/edit-product/:id', getEditProductForm);
router.post('/edit-product', updateProduct);
router.get('/products', getProducts);
// router.post('/delete-product', adminControllers.deleteProduct);

module.exports = router;
