const createPost = require('./createPost');
const { composeResolvers } = require('../../../utils/graphql');
const { isAuthenticated } = require('../../guards');

module.exports = composeResolvers({ createPost }, isAuthenticated);
