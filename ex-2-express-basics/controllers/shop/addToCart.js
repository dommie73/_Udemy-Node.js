const Product = require('../../models/Product');

const addToCart = async (req, res) => {
	const { user } = req;
	const { id } = req.body;
	const product = await Product.fetchById(id);

	await user.addToCart(product);
	res.redirect('/cart');
};

module.exports = addToCart;
