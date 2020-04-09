const { body } = require('express-validator');

const { isImage } = require('../../utils/validators');

const updateProduct = [
	body('name')
		.not()
		.isEmpty()
		.withMessage('Product name is required.')
		.trim()
		.isLength({ max: 256 })
		.withMessage('Product name is too long.'),
	body('image')
		.optional({ checkFalsy: true })
		.custom(isImage),
	body('price')
		.not()
		.isEmpty()
		.withMessage('Product price is required.')
		.isFloat({ min: 0.0 })
		.isDecimal({ decimal_digits: '0,2' })
		.withMessage('Invalid product price.')
		.toFloat(),
	body('description').trim()
];

module.exports = updateProduct;
