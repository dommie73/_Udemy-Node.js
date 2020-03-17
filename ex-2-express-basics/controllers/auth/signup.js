const { User } = require('../../models');

const signup = async (req, res) => {
	const { email, password, confirmPassword } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		req.flash('error', 'This email is already associated with an account.');
		return res.redirect('/signup');
	}

	try {
		await User.create({ email, password });
		req.flash('success', 'Your account has been created. You can now log in.');
		res.redirect('/login');
	} catch (error) {
		req.flash(
			'error',
			'Invalid data. Check your email and password and try again.'
		);
		res.redirect('/signup');
	}
};

module.exports = signup;
