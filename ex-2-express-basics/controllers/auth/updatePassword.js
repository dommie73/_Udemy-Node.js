const { User } = require('../../models');

const updatePassword = async (req, res) => {
	const { userId, password, passwordToken } = req.body;
	const user = await User.findOne({
		_id: userId,
		'passwordResetToken.value': passwordToken,
		'passwordResetToken.expires': { $gt: Date.now() }
	});

	if (user) {
		try {
			await user.updatePassword(password);
			req.flash(
				'success',
				'Password has been changed. You can now log in using the new password.'
			);
			return res.redirect('/login');
		} catch (error) {
			req.flash('error', 'Database error. Please try again later.');
			return res.redirect('/');
		}
	}

	req.flash(
		'error',
		'We could not update your password. Most likely the link you followed has expired.'
	);
	res.redirect('/reset');
};

module.exports = updatePassword;
