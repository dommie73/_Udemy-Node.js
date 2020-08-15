const updateUser = async (req, res, next) => {
	try {
		const { user } = req;
		const { status } = req.body;

		user.status = status;
		await user.save();

		res.status(200).send({
			message: 'User status has been updated.',
			user
		});
	} catch (err) {
		next(err);
	}
};

module.exports = updateUser;
