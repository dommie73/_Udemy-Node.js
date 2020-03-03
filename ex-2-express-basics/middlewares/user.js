const User = require('../models/User');

const user = async (req, res, next) => {
	req.user = await User.fetchById(User.defaultId);
	next();
};

module.exports = user;
