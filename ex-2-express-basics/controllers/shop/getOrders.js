const getOrders = async (req, res) => {
	const { user } = req;
	const orders = await user.getOrders();

	res.render('shop/orders', { pageTitle: 'Orders', orders });
};

module.exports = getOrders;
