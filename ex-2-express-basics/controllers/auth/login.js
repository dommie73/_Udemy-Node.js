const { User } = require('../../models');

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (user) {
			const isMatchingPassword = await user.isMatchingPassword(password);
			if (isMatchingPassword) {
				req.session.userId = user._id;
				req.flash('success', `Hello, ${email}!`);
				return req.saveSessionAndRedirect('/');
			}
		}

		req.flash('error', 'Invalid username or password.');
		req.saveSessionAndRedirect('/login');
	} catch (err) {
		next(err);
	}
};

module.exports = login;
