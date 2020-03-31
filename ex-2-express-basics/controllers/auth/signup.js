const { User } = require('../../models');
const sgMail = require('../../services/email');
const { truncateEmail } = require('../../utils/helpers');

const signup = async (req, res, next) => {
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
		req.saveSessionAndRedirect('/login');
	} catch (err) {
		next(err);
	}
};

module.exports = signup;
