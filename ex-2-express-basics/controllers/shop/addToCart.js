const { Cart, Product } = require('../../models');

const addToCart = async (req, res) => {
	const { productId } = req.body;
	const { price } = await Product.fetchById(productId);
	await Cart.addProduct(productId, price);
	res.redirect('/cart');
};

module.exports = addToCart;
