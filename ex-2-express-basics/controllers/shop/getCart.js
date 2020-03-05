const getCart = async (req, res) => {
	const { user } = req;
	const cart = await user.getCart();

	res.render('shop/cart', { pageTitle: 'Cart', cart });
};

module.exports = getCart;
