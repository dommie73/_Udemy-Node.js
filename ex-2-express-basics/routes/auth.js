const { Router } = require('express');

const authControllers = require('../controllers/auth');

const router = Router();

router.get('/login', authControllers.getLoginForm);

module.exports = router;
