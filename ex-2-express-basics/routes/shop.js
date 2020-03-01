const { Router } = require('express');

const getIndex = require('../controllers/shop/getIndex');
const getProducts = require('../controllers/shop/getProducts');
const getProductDetails = require('../controllers/shop/getProductDetails');

const router = Router();

router.get('/', getIndex);
// router.get('/cart', shopControllers.getCart);
// router.post('/cart', shopControllers.addToCart);
// router.post('/cart/delete-product', shopControllers.deleteFromCart);
// router.get('/orders', shopControllers.getOrders);
// router.post('/order', shopControllers.createOrder);
// router.get('/checkout', shopControllers.getCheckout);
router.get('/products', getProducts);
router.get('/products/:id', getProductDetails);

module.exports = router;
