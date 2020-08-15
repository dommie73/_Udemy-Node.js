const { User } = require('../../models');

const createUser = async (req, res, next) => {
	try {
		const { email, name, password } = req.body;
		const user = await User.create({ email, name, password });

		res.status(201).send({
			message: 'The user account has been successfully created.',
			user
		});
	} catch (err) {
		next(err);
	}
};

module.exports = createUser;
