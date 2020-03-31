const getCart = async (req, res, next) => {
	try {
		const { user } = req;
		const cart = await user.getCart();

		res.render('shop/cart', { pageTitle: 'Cart', cart });
	} catch (err) {
		next(err);
	}
};

module.exports = getCart;
