const { GraphQLString } = require('graphql');

const ErrorHandler = require('../../../utils/ErrorHandler');
const { User: UserModel } = require('../../../models');
const { User: UserType } = require('../../types');
const validateUser = require('../../../validators/user');

const createUser = {
	type: UserType,
	args: {
		email: { type: GraphQLString },
		name: { type: GraphQLString },
		password: { type: GraphQLString }
	},
	resolve: async function (source, args) {
		const errors = await validateUser(args);

		if (errors.length > 0) {
			throw new ErrorHandler(422, 'User validation failed.', errors);
		}

		const user = await UserModel.create(args);

		return user.toJSON();
	}
};

module.exports = createUser;
