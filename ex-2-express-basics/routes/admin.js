const { Router } = require('express');

const adminControllers = require('../controllers/admin');
const { protected } = require('../middlewares');

const router = Router();

router.all('*', protected);

router.get('/add-product', adminControllers.getAddProductForm);
router.post('/add-product', adminControllers.createProduct);
router.get('/edit-product/:id', adminControllers.getEditProductForm);
router.post('/edit-product', adminControllers.updateProduct);
router.get('/products', adminControllers.getProducts);
router.post('/delete-product', adminControllers.deleteProduct);

module.exports = router;
