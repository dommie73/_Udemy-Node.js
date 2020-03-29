const { combineValidatorsWithMiddlewares } = require('../../utils/validators');
const { validationErrors } = require('../../middlewares');

const updateProduct = require('./updateProduct');

const validators = {
	updateProduct
};

module.exports = combineValidatorsWithMiddlewares(validators, validationErrors);
