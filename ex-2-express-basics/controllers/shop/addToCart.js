const addToCart = async (req, res, next) => {
	try {
		const { user } = req;
		const { id: productId } = req.body;

		await user.addToCart(productId);

		req.flash('success', 'Product has been added to your cart.');
		req.saveSessionAndRedirect('/cart');
	} catch (err) {
		next(err);
	}
};

module.exports = addToCart;
