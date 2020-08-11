const authJwt = require('./authJwt');
const authLocal = require('./authLocal');
const cors = require('./cors');
const errorHandler = require('./errorHandler');
const imageUpload = require('./imageUpload');
const notFoundHandler = require('./notFoundHandler');
const validationErrors = require('./validationErrors');

module.exports = {
	authJwt,
	authLocal,
	cors,
	errorHandler,
	imageUpload,
	notFoundHandler,
	validationErrors
};
