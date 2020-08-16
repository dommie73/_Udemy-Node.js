const { User: UserModel } = require('../../../models');
const { MongoDBObjectId, User: UserType } = require('../../types');

const getUser = {
	type: UserType,
	args: {
		id: { type: MongoDBObjectId }
	},
	resolve: async function (source, { id }) {
		return await UserModel.findById(id).orFail();
	}
};

module.exports = getUser;
