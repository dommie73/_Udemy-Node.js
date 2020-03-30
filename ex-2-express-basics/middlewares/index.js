const csrfToken = require('./csrfToken');
const currentUrl = require('./currentUrl');
const flashMessages = require('./flashMessages');
const inputSaver = require('./inputSaver');
const isAuthenticated = require('./isAuthenticated');
const mongoSession = require('./mongoSession');
const protected = require('./protected');
const reqLogger = require('./reqLogger');
const user = require('./user');
const validationErrors = require('./validationErrors');

module.exports = {
	csrfToken,
	currentUrl,
	flashMessages,
	inputSaver,
	isAuthenticated,
	mongoSession,
	protected,
	reqLogger,
	user,
	validationErrors
};
