const { GraphQLString } = require('graphql');

const ErrorHandler = require('../../../utils/ErrorHandler');
const { deleteImage } = require('../../../utils/imageUpload');
const { Post: PostModel } = require('../../../models');
const { MongoDBObjectId, Post: PostType } = require('../../types');
const validatePost = require('../../../validators/post');

const updatePost = {
	type: PostType,
	args: {
		id: { type: MongoDBObjectId },
		title: { type: GraphQLString },
		content: { type: GraphQLString },
		image: { type: GraphQLString }
	},
	resolve: async function (source, args, { user }) {
		let isNewImage = true;

		try {
			const { image: currentImage } = await PostModel.findOne({
				_id: args.id
			}).orFail(new ErrorHandler(404, 'Post not found.'));

			isNewImage = args.image !== currentImage;

			const errors = await validatePost(args);

			if (errors.length > 0) {
				throw new ErrorHandler(422, 'Post validation failed.', errors);
			}

			return await PostModel.findOneAndUpdate(
				{ _id: args.id, creator: user._id },
				{
					title: args.title,
					content: args.content,
					...(isNewImage && { image: args.image })
				},
				{ new: true }
			)
				.populate('creator')
				.orFail(new ErrorHandler(403, 'Unauthorized user.'));
		} catch (err) {
			if (isNewImage) {
				deleteImage(args.image);
			}
			throw err;
		}
	}
};

module.exports = updatePost;
