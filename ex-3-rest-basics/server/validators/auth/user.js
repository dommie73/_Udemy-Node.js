const { body } = require('express-validator');

const { User } = require('../../models');

const user = [
	body('email')
		.isEmail()
		.withMessage('Invalid email.')
		.bail()
		.custom(
			async email =>
				(await User.exists({ email })) &&
				Promise.reject('Email already in use.')
		)
		.normalizeEmail(),
	body('name').trim().not().isEmpty(),
	body('password').isLength({ min: 5 }).withMessage('Password too short.')
];

module.exports = user;
