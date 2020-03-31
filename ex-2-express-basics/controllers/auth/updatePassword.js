const { User } = require('../../models');

const updatePassword = async (req, res, next) => {
	try {
		const { userId, password, passwordToken } = req.body;
		const user = await User.findOne({
			_id: userId,
			'passwordResetToken.value': passwordToken,
			'passwordResetToken.expires': { $gt: Date.now() }
		});

		if (user) {
			await user.updatePassword(password);
			req.flash(
				'success',
				'Password has been changed. You can now log in using the new password.'
			);
			return req.saveSessionAndRedirect('/login');
		}

		req.flash(
			'error',
			'We could not update your password. Most likely the link you followed has expired.'
		);
		req.saveSessionAndRedirect('/reset');
	} catch (err) {
		next(err);
	}
};

module.exports = updatePassword;
