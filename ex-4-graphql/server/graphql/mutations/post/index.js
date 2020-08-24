const createPost = require('./createPost');
const deletePost = require('./deletePost');
const updatePost = require('./updatePost');
const { composeResolvers } = require('../../../utils/graphql');
const { isAuthenticated } = require('../../guards');

module.exports = composeResolvers(
	{
		createPost,
		deletePost,
		updatePost
	},
	isAuthenticated
);
