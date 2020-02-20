const { Cart, Product } = require('../../models');

const getCart = async (req, res) => {
	const cart = await Cart.fetch();
	for (const id of Object.keys(cart.products)) {
		const amount = cart.products[id];
		const { name, price } = await Product.fetchById(id);
		cart.products[id] = Object.assign({}, { amount, name, price });
	}
	res.render('shop/cart', { pageTitle: 'Cart', cart });
};

module.exports = getCart;
