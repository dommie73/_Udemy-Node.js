const getPasswordResetForm = (req, res, next) => {
	res.render('auth/reset-password', { pageTitle: 'Reset Password' });
};

module.exports = getPasswordResetForm;
