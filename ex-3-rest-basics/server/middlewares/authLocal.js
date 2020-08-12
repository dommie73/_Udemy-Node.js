const { User } = require('../models');
const ErrorHandler = require('../utils/ErrorHandler');

const authLocal = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email }).select('+password');
		const passwordMatch = await user?.passwordMatch(password);

		if (user && passwordMatch) {
			req.user = user;
			next();
		} else {
			throw new ErrorHandler(401, 'Invalid credentials');
		}
	} catch (err) {
		next(err);
	}
};

module.exports = authLocal;
