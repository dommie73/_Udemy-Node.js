const { GraphQLBoolean } = require('graphql');

const ErrorHandler = require('../../../utils/ErrorHandler');
const { Post: PostModel } = require('../../../models');
const { MongoDBObjectId } = require('../../types');

const deletePost = {
	type: GraphQLBoolean,
	args: {
		id: { type: MongoDBObjectId }
	},
	resolve: async function (source, { id }, { user }) {
		await PostModel.findOneAndRemove({
			_id: id,
			creator: user._id
		}).orFail(new ErrorHandler(403, 'Unauthorized user.'));

		return true;
	}
};

module.exports = deletePost;
