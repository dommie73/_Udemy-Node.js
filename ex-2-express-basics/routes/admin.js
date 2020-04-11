const { Router } = require('express');

const adminControllers = require('../controllers/admin');
const adminValidators = require('../validators/admin');
const { protected, upload } = require('../middlewares');
const { imageFilter } = require('../utils/multer');

const router = Router();

const imageLimits = {
	fileSize: 1 * 1024 * 1024
};

router.all('*', protected);

router.get('/add-product', adminControllers.getAddProductForm);
router.post(
	'/add-product',
	upload('image', imageFilter, imageLimits),
	adminValidators.updateProduct,
	adminControllers.createProduct
);
router.get('/edit-product/:id', adminControllers.getEditProductForm);
router.post(
	'/edit-product',
	upload('image', imageFilter, imageLimits),
	adminValidators.updateProduct,
	adminControllers.updateProduct
);
router.get('/products', adminControllers.getProducts);
router.post('/delete-product', adminControllers.deleteProduct);
router.delete('/delete-product/:id', adminControllers.deleteProductAsync);

module.exports = router;
