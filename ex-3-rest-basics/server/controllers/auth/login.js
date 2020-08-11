const login = async (req, res, next) => {
	try {
		const { user } = req;
		const token = user.generateToken();

		res.status(200).send({
			userId: user._id.toString(),
			token
		});
	} catch (err) {
		next(err);
	}
};

module.exports = login;
