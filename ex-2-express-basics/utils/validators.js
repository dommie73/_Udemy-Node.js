const { User } = require('../models');

exports.isMatchingPassword = (value, { req }) => {
	if (value !== req.body.password) {
		throw new Error('Passwords do not match.');
	}
	return true;
};

exports.isEmailInUse = async email => {
	const user = await User.findOne({ email });

	if (!user) {
		return Promise.reject('This email is not associated with any account.');
	}
};
