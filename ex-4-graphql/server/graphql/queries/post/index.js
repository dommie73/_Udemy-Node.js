const getPost = require('./getPost');
const getPosts = require('./getPosts');
const { composeResolvers } = require('../../../utils/graphql');
const { isAuthenticated } = require('../../guards');

module.exports = composeResolvers({ getPost, getPosts }, isAuthenticated);
