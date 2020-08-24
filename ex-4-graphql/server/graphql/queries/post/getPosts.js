const { GraphQLInt } = require('graphql');

const { Post: PostModel } = require('../../../models');
const { PostList } = require('../../types');

const getPosts = {
	type: PostList,
	args: {
		page: { type: GraphQLInt }
	},
	resolve: async function (source, { page = 1 }) {
		return await PostModel.paginate(
			{},
			{ currentPage: page, populate: 'creator' }
		);
	}
};

module.exports = getPosts;
