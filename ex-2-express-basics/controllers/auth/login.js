const login = (req, res) => {
	req.session.isAuthenticated = true;
	res.redirect('/');
};

module.exports = login;
