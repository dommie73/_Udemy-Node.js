const getOrders = async (req, res, next) => {
	try {
		const { user } = req;
		const orders = await user.getOrders();

		res.render('shop/orders', { pageTitle: 'Orders', orders });
	} catch (err) {
		next(err);
	}
};

module.exports = getOrders;
