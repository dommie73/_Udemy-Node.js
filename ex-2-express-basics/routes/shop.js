const { Router } = require('express');

const { displayItems } = require('../controllers/shop');

const router = Router();

router.get('/', displayItems);

module.exports = router;
