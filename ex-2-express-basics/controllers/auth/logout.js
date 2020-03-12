const logout = (req, res, next) => {
	req.session.destroy(() => {
		res.redirect('/');
	});
};

module.exports = logout;
