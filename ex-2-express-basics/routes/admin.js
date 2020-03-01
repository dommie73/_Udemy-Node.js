const { Router } = require('express');

const getAddProductForm = require('../controllers/admin/getAddProductForm');
const createProduct = require('../controllers/admin/createProduct');

const router = Router();

router.get('/add-product', getAddProductForm);
router.post('/add-product', createProduct);
// router.get('/edit-product/:id', adminControllers.getEditProductForm);
// router.post('/edit-product', adminControllers.updateProduct);
// router.get('/products', adminControllers.getProducts);
// router.post('/delete-product', adminControllers.deleteProduct);

module.exports = router;
