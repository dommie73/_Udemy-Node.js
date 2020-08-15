const { body } = require('express-validator');

const status = [
	body('status').trim().not().isEmpty().withMessage('Status cannot be empty.')
];

module.exports = status;
