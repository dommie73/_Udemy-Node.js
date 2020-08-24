const getUser = require('./getUser');
const login = require('./login');
const { composeResolvers } = require('../../../utils/graphql');
const { isAuthenticated } = require('../../guards');

module.exports = {
	...composeResolvers({ getUser }, isAuthenticated),
	login
};
