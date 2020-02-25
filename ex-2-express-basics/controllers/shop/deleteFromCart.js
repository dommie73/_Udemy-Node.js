const deleteFromCart = async (req, res) => {
	const { user } = req;
	const { id } = req.body;
	const cart = await user.getCart();
	const [product] = await cart.getProducts({ where: { id } });

	await product.CartProduct.destroy();
	res.redirect('/cart');
};

module.exports = deleteFromCart;
