const { GraphQLString } = require('graphql');

const { User: UserModel } = require('../../../models');
const { User: UserType } = require('../../types');

const createUser = {
	type: UserType,
	args: {
		email: { type: GraphQLString },
		name: { type: GraphQLString },
		password: { type: GraphQLString }
	},
	resolve: async function (source, { email, name, password }) {
		const user = await UserModel.create({ email, name, password });

		return user.toJSON();
	}
};

module.exports = createUser;
