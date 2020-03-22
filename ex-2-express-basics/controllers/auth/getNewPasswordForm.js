const { User } = require('../../models');

const getNewPasswordForm = async (req, res) => {
	const { token } = req.params;
	const user = await User.findOne({
		'passwordResetToken.value': token,
		'passwordResetToken.expires': { $gt: Date.now() }
	});

	if (user) {
		return res.render('auth/new-password', {
			pageTitle: 'Set a new password',
			userId: user._id.toString(),
			token
		});
	}

	req.flash('error', 'This password reset token is invalid.');
	res.redirect('/reset');
};

module.exports = getNewPasswordForm;
