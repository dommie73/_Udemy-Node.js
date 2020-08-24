const { GraphQLString } = require('graphql');

const ErrorHandler = require('../../../utils/ErrorHandler');
const { deleteImage } = require('../../../utils/imageUpload');
const { Post: PostModel } = require('../../../models');
const { Post: PostType } = require('../../types');
const validatePost = require('../../../validators/post');

const createPost = {
	type: PostType,
	args: {
		title: { type: GraphQLString },
		content: { type: GraphQLString },
		image: { type: GraphQLString }
	},
	resolve: async function (source, args, { user }) {
		const errors = await validatePost(args);

		if (errors.length > 0) {
			deleteImage(args.image);
			throw new ErrorHandler(422, 'Post validation failed.', errors);
		}

		const post = await PostModel.create({
			...args,
			creator: user
		});

		return post;
	}
};

module.exports = createPost;
