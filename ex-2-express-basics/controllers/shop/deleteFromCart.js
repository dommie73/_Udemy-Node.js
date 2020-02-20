const { Cart, Product } = require('../../models');

const deleteFromCart = async (req, res) => {
	const { id } = req.body;
	const { price } = await Product.fetchById(id);
	await Cart.deleteProduct(id, price);
	res.redirect('/cart');
};

module.exports = deleteFromCart;
