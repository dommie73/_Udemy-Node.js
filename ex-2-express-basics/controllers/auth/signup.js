const { User } = require('../../models');
const sgMail = require('../../services/email');
const { truncateEmail } = require('../../utils/helpers');

const signup = async (req, res) => {
	const { email, password, confirmPassword } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		req.flash('error', 'This email is already associated with an account.');
		return res.redirect('/signup');
	}

	try {
		await User.create({ email, password });
		sgMail.send(
			{
				from: 'noreply@expressapp.com',
				to: email,
				subject: 'Welcome to the app!'
			},
			'emails/welcome',
			{
				email: truncateEmail(email),
				shopHref: `http://localhost:${process.env.PORT}/products`
			}
		);
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
