const { Post: PostModel } = require('../../../models');
const { MongoDBObjectId, Post: PostType } = require('../../types');
const ErrorHandler = require('../../../utils/ErrorHandler');

const getPost = {
	type: PostType,
	args: {
		id: { type: MongoDBObjectId }
	},
	resolve: async function (source, { id }, { isAuthenticated }) {
		if (!isAuthenticated) {
			throw new ErrorHandler(401, 'Not authenticated');
		}

		return await PostModel.findById(id)
			.populate('creator')
			.orFail(new ErrorHandler(404, 'Post not found.'));
	}
};

module.exports = getPost;
