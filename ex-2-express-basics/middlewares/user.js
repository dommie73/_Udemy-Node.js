const { User } = require('../models');

const user = async (req, res, next) => {
	req.user = await User.findDefault();
	next();
};

module.exports = user;
