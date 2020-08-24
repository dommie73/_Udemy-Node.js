const { GraphQLNonNull: NonNull, GraphQLString } = require('graphql');

const { User } = require('../../../models');
const { AuthData } = require('../../types');
const ErrorHandler = require('../../../utils/ErrorHandler');

const login = {
	type: AuthData,
	args: {
		email: { type: new NonNull(GraphQLString) },
		password: { type: new NonNull(GraphQLString) }
	},
	resolve: async function (source, { email, password }) {
		const user = await User.findOne({ email }).select('+password');
		const passwordMatch = await user?.passwordMatch(password);

		if (!(user && passwordMatch)) {
			throw new ErrorHandler(401, 'Invalid credentials.');
		}

		const token = user.generateToken();

		return { userId: user._id, token };
	}
};

module.exports = login;
