const { User } = require('../../models');

const signup = async (req, res) => {
	const { email, password, confirmPassword } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		return res.redirect('/signup');
	}

	try {
		await User.create({ email, password });
		res.redirect('/login');
	} catch (error) {
		res.redirect('/signup');
	}
};

module.exports = signup;
