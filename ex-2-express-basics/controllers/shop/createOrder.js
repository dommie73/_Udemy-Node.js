const createOrder = async (req, res) => {
	const { user } = req;

	await user.createOrder();

	req.flash('success', 'Thank you for placing the order!');
	res.redirect('/orders');
};

module.exports = createOrder;
