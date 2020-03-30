const { body } = require('express-validator');

const { isMatchingPassword } = require('../../utils/validators');

const updatePassword = [
	body('password')
		.not()
		.isEmpty()
		.withMessage('Password field is required.')
		.isLength({ min: 8 })
		.withMessage('The password must be at least 8 characters long.'),
	body('confirmPassword').custom(isMatchingPassword)
];

module.exports = updatePassword;
