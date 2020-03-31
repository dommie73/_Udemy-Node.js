const { User } = require('../models');

const user = async (req, res, next) => {
	try {
		req.user = await User.findById(req.session.userId);
		next();
	} catch (err) {
		next(err);
	}
};

module.exports = user;
