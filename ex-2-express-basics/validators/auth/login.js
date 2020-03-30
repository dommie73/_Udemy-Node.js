const { body } = require('express-validator');

const login = [
	body('email')
		.not()
		.isEmpty()
		.withMessage('Email field is required.')
		.isEmail()
		.withMessage('Email is not valid.')
		.normalizeEmail(),
	body('password')
		.not()
		.isEmpty()
		.withMessage('Password field is required.')
];

module.exports = login;
