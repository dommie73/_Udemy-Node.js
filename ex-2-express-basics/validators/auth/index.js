const { combineValidatorsWithMiddlewares } = require('../../utils/validators');
const { validationErrors } = require('../../middlewares');

const signup = require('./signup');

const validators = { signup };

module.exports = combineValidatorsWithMiddlewares(validators, validationErrors);
