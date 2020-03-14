const getSignupForm = (req, res) => {
	res.render('auth/signup', { pageTitle: 'Sign Up' });
};

module.exports = getSignupForm;
