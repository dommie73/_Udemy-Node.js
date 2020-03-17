const deleteFromCart = async (req, res) => {
	const { user } = req;
	const { id } = req.body;

	await user.deleteFromCart(id);

	req.flash('success', 'Product has been removed from your cart.');
	res.redirect('/cart');
};

module.exports = deleteFromCart;
