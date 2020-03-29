const { body } = require('express-validator');

const updateProduct = [
	body('name')
		.not()
		.isEmpty()
		.withMessage('Product name is required.')
		.trim()
		.isLength({ max: 256 })
		.withMessage('Product name is too long.'),
	body('imageUrl')
		.optional({ checkFalsy: true })
		.trim()
		.isURL()
		.withMessage('Invalid product image URL.'),
	body('price')
		.not()
		.isEmpty()
		.withMessage('Product price is required.')
		.isFloat({ min: 0.0 })
		.isDecimal({ decimal_digits: 2 })
		.withMessage('Invalid product price.')
		.toFloat(),
	body('description').trim()
];

module.exports = updateProduct;
