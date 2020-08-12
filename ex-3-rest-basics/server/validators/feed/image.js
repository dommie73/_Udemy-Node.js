const { body } = require('express-validator');

const image = [
	body('image')
		.custom((value, { req }) => req.file !== void 0)
		.withMessage('No image provided.')
];

module.exports = image;
