const jwt = require('jsonwebtoken');

const { User } = require('../models');
const ErrorHandler = require('../utils/ErrorHandler');

const authJwt = async (req, res, next) => {
	try {
		const token = req.get('Authorization').split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decodedToken.userId).orFail(
			new ErrorHandler(404, 'User not found')
		);

		req.user = user;
		next();
	} catch (err) {
		throw new ErrorHandler(401, 'Invalid credentials.');
	}
};

module.exports = authJwt;
