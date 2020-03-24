const { body } = require('express-validator');

const { isEmailInUse, isMatchingPassword } = require('../../utils/validators');

const signup = [
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
];

module.exports = signup;
