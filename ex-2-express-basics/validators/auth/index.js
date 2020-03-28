const { combineValidatorsWithMiddlewares } = require('../../utils/validators');
const { validationErrors } = require('../../middlewares');

const login = require('./login');
const signup = require('./signup');
const updatePassword = require('./updatePassword');

const validators = {
	login,
	signup,
	updatePassword
};

module.exports = combineValidatorsWithMiddlewares(validators, validationErrors);
