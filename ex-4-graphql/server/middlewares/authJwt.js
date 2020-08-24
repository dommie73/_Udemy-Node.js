const jwt = require('jsonwebtoken');

const { User } = require('../models');

const authJwt = async (req, res, next) => {
	try {
		const token = req.get('Authorization').split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decodedToken.userId).orFail();

		req.isAuthenticated = true;
		req.user = user;
	} catch (err) {
		req.isAuthenticated = false;
	}
	next();
};

module.exports = authJwt;
