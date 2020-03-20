const getNewPasswordForm = (req, res) => {
	const { token } = req.params;

	res.render('auth/new-password', { pageTitle: 'Set a new password' });
};

module.exports = getNewPasswordForm;
