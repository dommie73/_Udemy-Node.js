const deleteFromCart = async (req, res, next) => {
	try {
		const { user } = req;
		const { id } = req.body;

		await user.deleteFromCart(id);

		req.flash('success', 'Product has been removed from your cart.');
		req.saveSessionAndRedirect('/cart');
	} catch (err) {
		next(err);
	}
};

module.exports = deleteFromCart;
