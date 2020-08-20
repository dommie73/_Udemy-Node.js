const ErrorHandler = require('../../utils/ErrorHandler');

const isAuthenticated = next => {
	return (root, args, context, info) => {
		if (!context.isAuthenticated) {
			throw new ErrorHandler(401, 'Not authenticated.');
		}

		return next(root, args, context, info);
	};
};

module.exports = isAuthenticated;
