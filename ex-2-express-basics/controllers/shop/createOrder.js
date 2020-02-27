const createOrder = async (req, res) => {
	const { user } = req;
	const cart = await user.getCart();
	const products = await cart.getProducts();
	const order = await user.createOrder();

	products.forEach(product => {
		product.addOrder(order, {
			through: { quantity: product.CartProduct.quantity }
		});
	});

	await cart.setProducts(null);

	res.redirect('/orders');
};

module.exports = createOrder;
