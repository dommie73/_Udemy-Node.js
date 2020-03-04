const deleteFromCart = async (req, res) => {
	const { user } = req;
	const { id } = req.body;

	await user.deleteFromCart(id);
	res.redirect('/cart');
};

module.exports = deleteFromCart;
