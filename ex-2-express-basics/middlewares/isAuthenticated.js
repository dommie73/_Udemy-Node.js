const isAuthenticated = (req, res, next) => {
	res.locals.isAuthenticated = req.session.isAuthenticated;
	next();
};

module.exports = isAuthenticated;
