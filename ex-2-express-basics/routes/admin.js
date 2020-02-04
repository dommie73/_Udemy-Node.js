const { Router } = require('express');

const adminControllers = require('../controllers/admin');

const router = Router();

router.get('/add-product', adminControllers.getProductForm);
router.post('/add-product', adminControllers.createProduct);

module.exports = router;
