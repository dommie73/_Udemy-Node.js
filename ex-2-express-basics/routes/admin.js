const { Router } = require('express');

const { addProduct, saveProduct } = require('../controllers/admin');

const router = Router();

router.get('/add-product', addProduct);
router.post('/add-product', saveProduct);

module.exports = router;
