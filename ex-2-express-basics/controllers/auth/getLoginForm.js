const getLoginForm = (req, res) => {
	res.render('auth/login', { pageTitle: 'Login' });
};

module.exports = getLoginForm;
