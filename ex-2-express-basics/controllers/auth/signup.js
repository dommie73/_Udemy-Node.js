const { User } = require('../../models');
const sgMail = require('../../services/email');
const { truncateEmail } = require('../../utils/helpers');

const signup = async (req, res) => {
	try {
		const { email, password } = req.body;
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
		req.flash('error', error);
		res.redirect('/signup');
	}
};

module.exports = signup;
