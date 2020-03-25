const { combineValidatorsWithMiddlewares } = require('../../utils/validators');
const { validationErrors } = require('../../middlewares');

const login = require('./login');
const signup = require('./signup');

const validators = {
	login,
	signup
};

module.exports = combineValidatorsWithMiddlewares(validators, validationErrors);
