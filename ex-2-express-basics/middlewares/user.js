const user = async (req, res, next) => {
	// req.user = await User.findByPk(1);
	next();
};

module.exports = user;
