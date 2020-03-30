const { validationResult } = require('express-validator');

const validationErrors = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		req.flash(
			'error',
			errors.array({ onlyFirstError: true }).map(error => error.msg)
		);
		req.inputs.set();

		return req.saveSessionAndRedirect('back');
	}

	next();
};

module.exports = validationErrors;
