const getCheckout = (req, res) => {
	res.render('shop/checkout', { pageTitle: 'Checkout' });
};

module.exports = getCheckout;
