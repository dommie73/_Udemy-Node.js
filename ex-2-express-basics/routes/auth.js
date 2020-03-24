const { Router } = require('express');
const { body } = require('express-validator');

const authControllers = require('../controllers/auth');
const { isEmailInUse, isMatchingPassword } = require('../utils/validators');

const router = Router();

router.get('/login', authControllers.getLoginForm);
router.post('/login', authControllers.login);
router.post('/logout', authControllers.logout);
router.get('/reset', authControllers.getPasswordResetForm);
router.get('/reset/:token', authControllers.getNewPasswordForm);
router.post('/reset', authControllers.sendPasswordResetLink);
router.get('/signup', authControllers.getSignupForm);
router.post(
	'/signup',
	[
		body('email')
			.not()
			.isEmpty()
			.withMessage('Email field is required.')
			.isEmail()
			.withMessage('Email is not valid.')
			.not()
			.custom(isEmailInUse)
			.withMessage('This email is already associated with an account.'),
		body('password')
			.not()
			.isEmpty()
			.withMessage('Password field is required.')
			.isLength({ min: 8 })
			.withMessage('The password must be at least 8 characters long.'),
		body('confirmPassword').custom(isMatchingPassword)
	],
	authControllers.signup
);
router.post('/update-password', authControllers.updatePassword);

module.exports = router;
