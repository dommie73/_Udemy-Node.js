const getOrders = (req, res) => {
	res.render('shop/orders', { pageTitle: 'Orders' });
};

module.exports = getOrders;
