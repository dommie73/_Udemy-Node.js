const cors = require('./cors');
const errorHandler = require('./errorHandler');
const notFoundHandler = require('./notFoundHandler');
const validationErrors = require('./validationErrors');

module.exports = {
	cors,
	errorHandler,
	notFoundHandler,
	validationErrors
};
