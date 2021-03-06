const debug = require('debug')('app:middleware:errorHandler');
const { MulterError } = require('multer');

const ErrorHandler = require('../utils/ErrorHandler');

const handleError = (err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}

	const { statusCode = 500, message, stack } = err;

	debug('%s', stack || message);

	res.status(statusCode).send({
		error: true,
		message:
			err instanceof ErrorHandler || err instanceof MulterError
				? message
				: 'Internal server error.'
	});
};

module.exports = handleError;
