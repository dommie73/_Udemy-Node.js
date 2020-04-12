const getCheckout = async (req, res, next) => {
	try {
		const { user } = req;
		const cart = await user.getCart();

		res.render('shop/checkout', { pageTitle: 'Checkout', cart });
	} catch (err) {
		next(err);
	}
};

module.exports = getCheckout;
