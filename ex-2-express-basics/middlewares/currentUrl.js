const currentUrl = (req, res, next) => {
	res.locals.currentUrl = req.path;
	next();
};

module.exports = currentUrl;
