const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');

const authJwt = (req, res, next) => {
	try {
		const token = req.get('Authorization').split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		req.userId = decodedToken.userId;
		next();
	} catch (err) {
		throw new ErrorHandler(401, 'Invalid credentials.');
	}
};

module.exports = authJwt;
