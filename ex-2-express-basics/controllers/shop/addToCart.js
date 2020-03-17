const addToCart = async (req, res) => {
	const { user } = req;
	const { id: productId } = req.body;

	await user.addToCart(productId);

	req.flash('success', 'Product has been added to your cart.');
	res.redirect('/cart');
};

module.exports = addToCart;
