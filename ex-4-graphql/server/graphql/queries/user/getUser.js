const { User: UserModel } = require('../../../models');
const { MongoDBObjectId, User: UserType } = require('../../types');
const ErrorHandler = require('../../../utils/ErrorHandler');

const getUser = {
	type: UserType,
	args: {
		id: { type: MongoDBObjectId }
	},
	resolve: async function (source, { id }) {
		return await UserModel.findById(id)
			.populate('posts')
			.orFail(new ErrorHandler(404, 'User not found.'));
	}
};

module.exports = getUser;
