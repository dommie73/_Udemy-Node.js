const { Router } = require('express');

const adminControllers = require('../controllers/admin');
const adminValidators = require('../validators/admin');
const { protected } = require('../middlewares');

const router = Router();

router.all('*', protected);

router.get('/add-product', adminControllers.getAddProductForm);
router.post(
	'/add-product',
	adminValidators.updateProduct,
	adminControllers.createProduct
);
router.get('/edit-product/:id', adminControllers.getEditProductForm);
router.post(
	'/edit-product',
	adminValidators.updateProduct,
	adminControllers.updateProduct
);
router.get('/products', adminControllers.getProducts);
router.post('/delete-product', adminControllers.deleteProduct);

module.exports = router;
