const createPost = require('./createPost');
const updatePost = require('./updatePost');
const { composeResolvers } = require('../../../utils/graphql');
const { isAuthenticated } = require('../../guards');

module.exports = composeResolvers(
	{
		createPost,
		updatePost
	},
	isAuthenticated
);
