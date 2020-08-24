const authJwt = require('./authJwt');
const cors = require('./cors');
const errorHandler = require('./errorHandler');
const imageUpload = require('./imageUpload');
const notFoundHandler = require('./notFoundHandler');

module.exports = {
	authJwt,
	cors,
	errorHandler,
	imageUpload,
	notFoundHandler
};
