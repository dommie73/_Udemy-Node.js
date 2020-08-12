const { body } = require('express-validator');

const post = [
	body('title')
		.trim()
		.isLength({ min: 5 })
		.withMessage('This title is too short.'),
	body('content')
		.trim()
		.isLength({ min: 5 })
		.withMessage('Please write something more!')
];

module.exports = post;
