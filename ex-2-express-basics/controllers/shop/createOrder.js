const createOrder = async (req, res, next) => {
	try {
		const { user } = req;

		await user.createOrder();

		req.flash('success', 'Thank you for placing the order!');
		req.saveSessionAndRedirect('/orders');
	} catch (err) {
		next(err);
	}
};

module.exports = createOrder;
