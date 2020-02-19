const { Router } = require('express');

const adminControllers = require('../controllers/admin');

const router = Router();

router.get('/add-product', adminControllers.getAddProductForm);
router.post('/add-product', adminControllers.createProduct);
router.get('/edit-product/:id', adminControllers.getEditProductForm);
router.post('/edit-product', adminControllers.updateProduct);
router.get('/products', adminControllers.getProducts);

module.exports = router;
