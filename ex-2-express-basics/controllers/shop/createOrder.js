const createOrder = async (req, res) => {
	const { user } = req;

	await user.createOrder();
	res.redirect('/orders');
};

module.exports = createOrder;
