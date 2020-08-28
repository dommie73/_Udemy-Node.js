const jwt = require('jsonwebtoken');

const { User } = require('../models');
const ErrorHandler = require('../utils/ErrorHandler');

const authJwt = async (req, res, next) => {
	try {
		let decodedToken;

		try {
			const token = req.get('Authorization').split(' ')[1];
			decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		} catch {
			throw new ErrorHandler(401, 'Invalid credentials.');
		}

		const user = await User.findById(decodedToken.userId).orFail(
			new ErrorHandler(404, 'User not found')
		);

		req.user = user;
		next();
	} catch (err) {
		next(err);
	}
};

module.exports = authJwt;
