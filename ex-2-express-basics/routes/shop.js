const { Router } = require('express');

const shopControllers = require('../controllers/shop');

const router = Router();

router.get('/', shopControllers.getIndex);
router.get('/cart', shopControllers.getCart);
router.post('/cart', shopControllers.addToCart);
router.post('/cart/delete-product', shopControllers.deleteFromCart);
router.get('/orders', shopControllers.getOrders);
router.get('/checkout', shopControllers.getCheckout);
router.get('/products', shopControllers.getProducts);
router.get('/products/:id', shopControllers.getProductDetails);

module.exports = router;
