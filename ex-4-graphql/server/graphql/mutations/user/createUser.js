const { GraphQLString } = require('graphql');

const { User: UserModel } = require('../../../models');
const { User: UserType } = require('../../types');
const { user: validateUser } = require('../../../validators/auth');

const createUser = {
	type: UserType,
	args: {
		email: { type: GraphQLString },
		name: { type: GraphQLString },
		password: { type: GraphQLString }
	},
	resolve: async function (source, args) {
		await validateUser(args);

		const user = await UserModel.create(args);

		return user.toJSON();
	}
};

module.exports = createUser;
