const ErrorHandler = require('../utils/ErrorHandler');

const handleNotFoundError = (req, res, next) => {
	throw new ErrorHandler(404, `Cannot ${req.method} ${req.originalUrl}.`);
};

module.exports = handleNotFoundError;
