const { body } = require('express-validator');

const { isEmailInUse } = require('../../utils/validators');
const updatePassword = require('./updatePassword');

const signup = [
	body('email')
		.not()
		.isEmpty()
		.withMessage('Email field is required.')
		.isEmail()
		.withMessage('Email is not valid.')
		.not()
		.custom(isEmailInUse)
		.withMessage('This email is already associated with an account.')
		.normalizeEmail(),
	...updatePassword
];

module.exports = signup;
