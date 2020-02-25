const getCart = async (req, res) => {
	const { user } = req;
	const cart = await user.getCart();
	const products = await cart.getProducts();
	const totalPrice = products.reduce(
		(acc, value) => acc + value.price * value.CartProduct.quantity,
		0
	);
	res.render('shop/cart', { pageTitle: 'Cart', products, totalPrice });
};

module.exports = getCart;
