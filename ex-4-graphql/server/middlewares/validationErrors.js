const { validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).send({
			error: true,
			message: 'Validation failed.',
			validationErrors: errors.array()
		});
	}

	next();
};

module.exports = handleValidationErrors;
