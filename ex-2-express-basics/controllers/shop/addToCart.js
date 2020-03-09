const addToCart = async (req, res) => {
	const { user } = req;
	const { id: productId } = req.body;

	await user.addToCart(productId);
	res.redirect('/cart');
};

module.exports = addToCart;
