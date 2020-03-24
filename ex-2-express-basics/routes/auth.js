const { Router } = require('express');

const authControllers = require('../controllers/auth');
const authValidators = require('../validators/auth');

const router = Router();

router.get('/login', authControllers.getLoginForm);
router.post('/login', authControllers.login);
router.post('/logout', authControllers.logout);
router.get('/reset', authControllers.getPasswordResetForm);
router.get('/reset/:token', authControllers.getNewPasswordForm);
router.post('/reset', authControllers.sendPasswordResetLink);
router.get('/signup', authControllers.getSignupForm);
router.post('/signup', authValidators.signup, authControllers.signup);
router.post('/update-password', authControllers.updatePassword);

module.exports = router;
