const { User } = require('../../models');
const sgMail = require('../../services/email');

const sendPasswordResetLink = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		req.flash('error', 'There is no user associated with this email.');
		return res.redirect('/reset');
	}

	await user.createPasswordResetToken();
	await sgMail.send(
		{
			from: 'noreply@expressapp.com',
			to: email,
			subject: 'Reset your password'
		},
		'emails/reset-password',
		{
			resetHref: `http://localhost:${process.env.PORT}/reset/${user.passwordResetToken.value}`
		}
	);

	req.flash(
		'success',
		'An email with instructions on how to reset your password has been sent.'
	);
	res.redirect('/');
};

module.exports = sendPasswordResetLink;
