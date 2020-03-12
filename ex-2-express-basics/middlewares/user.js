const { User } = require('../models');

const user = async (req, res, next) => {
	req.user = await User.findById(req.session.userId);
	next();
};

module.exports = user;
