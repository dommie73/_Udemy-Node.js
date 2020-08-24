const { GraphQLString } = require('graphql');

const ErrorHandler = require('../../../utils/ErrorHandler');
const { User: UserType } = require('../../types');
const validateUser = require('../../../validators/user');

const updateUser = {
	type: UserType,
	args: {
		status: { type: GraphQLString }
	},
	resolve: async function (source, { status }, { user }) {
		const errors = await validateUser.status(status);

		if (errors.length > 0) {
			throw new ErrorHandler(422, 'User validation failed.', errors);
		}

		user.status = status;
		await user.save();

		return user;
	}
};

module.exports = updateUser;
