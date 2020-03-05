const { User } = require('../models');

const user = async (req, res, next) => {
	req.user = await User.fetchById(User.defaultId);
	Object.setPrototypeOf(req.user, User.prototype);
	next();
};

module.exports = user;
