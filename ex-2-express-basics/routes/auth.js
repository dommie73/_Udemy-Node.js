const { Router } = require('express');

const authControllers = require('../controllers/auth');

const router = Router();

router.get('/login', authControllers.getLoginForm);
router.post('/login', authControllers.login);
router.post('/logout', authControllers.logout);
router.get('/reset', authControllers.getPasswordResetForm);
router.get('/signup', authControllers.getSignupForm);
router.post('/signup', authControllers.signup);

module.exports = router;
