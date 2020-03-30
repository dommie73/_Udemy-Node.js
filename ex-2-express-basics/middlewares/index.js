const csrfToken = require('./csrfToken');
const currentUrl = require('./currentUrl');
const errorHandler = require('./errorHandler');
const flashMessages = require('./flashMessages');
const inputSaver = require('./inputSaver');
const isAuthenticated = require('./isAuthenticated');
const mongoSession = require('./mongoSession');
const notFound = require('./notFound');
const protected = require('./protected');
const reqLogger = require('./reqLogger');
const sessionSaver = require('./sessionSaver');
const user = require('./user');
const validationErrors = require('./validationErrors');

module.exports = {
	csrfToken,
	currentUrl,
	errorHandler,
	flashMessages,
	inputSaver,
	isAuthenticated,
	mongoSession,
	notFound,
	protected,
	reqLogger,
	sessionSaver,
	user,
	validationErrors
};
