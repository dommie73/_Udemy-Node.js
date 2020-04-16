const getCheckout = async (req, res, next) => {
	try {
		const { user } = req;
		const cart = await user.getCart();

		if (cart.products.length === 0) {
			return res.redirect('/cart');
		}

		res.render('shop/checkout', { pageTitle: 'Checkout', cart });
	} catch (err) {
		next(err);
	}
};

module.exports = getCheckout;
