const { User } = require('../../models');

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		const isMatchingPassword = await user.isMatchingPassword(password);
		if (isMatchingPassword) {
			req.session.userId = user._id;
			return req.session.save(() => {
				res.redirect('/');
			});
		}
	}

	res.redirect('/login');
};

module.exports = login;
