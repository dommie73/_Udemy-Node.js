const { GraphQLString } = require('graphql');

const { Post: PostModel } = require('../../../models');
const { Post: PostType } = require('../../types');
const { post: validatePost } = require('../../../validators/feed');

const createPost = {
	type: PostType,
	args: {
		title: { type: GraphQLString },
		content: { type: GraphQLString },
		image: { type: GraphQLString }
	},
	resolve: async function (source, args) {
		await validatePost(args);

		/* temporarily fixed image and creator to avoid GraphQL errors */
		const post = await PostModel.create({
			...args,
			image: 'placeholder.jpg',
			creator: '5fa48af6184b531f74b393a4'
		});

		return post;
	}
};

module.exports = createPost;
