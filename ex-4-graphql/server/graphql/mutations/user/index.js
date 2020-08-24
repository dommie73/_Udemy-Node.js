const createUser = require('./createUser');
const updateUser = require('./updateUser');
const { composeResolvers } = require('../../../utils/graphql');
const { isAuthenticated } = require('../../guards');

module.exports = {
	...composeResolvers({ updateUser }, isAuthenticated),
	createUser
};
