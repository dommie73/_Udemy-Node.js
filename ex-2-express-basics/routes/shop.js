const { Router } = require('express');

const shopControllers = require('../controllers/shop');

const router = Router();

router.get('/', shopControllers.getProducts);

module.exports = router;
