const { Router } = require('express');

const shopControllers = require('../controllers/shop');
const { protected } = require('../middlewares');

const router = Router();

router.get('/', shopControllers.getIndex);
router.get('/cart', protected, shopControllers.getCart);
router.post('/cart', protected, shopControllers.addToCart);
router.post('/cart/delete-product', protected, shopControllers.deleteFromCart);
router.get('/orders', protected, shopControllers.getOrders);
router.get('/orders/:id', protected, shopControllers.getInvoice);
router.post('/order', protected, shopControllers.createOrder);
router.get('/checkout', protected, shopControllers.getCheckout);
router.post('/payment', protected, shopControllers.finalizePayment);
router.get('/products', shopControllers.getProducts);
router.get('/products/:id', shopControllers.getProductDetails);

module.exports = router;
