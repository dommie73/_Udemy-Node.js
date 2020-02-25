const { Product } = require('../../models');

const addToCart = async (req, res) => {
	const { user } = req;
	const { id } = req.body;
	const cart = (await user.getCart()) || (await user.createCart());
	let [product] = await cart.getProducts({ where: { id } });

	if (!product) {
		product = await Product.findByPk(id);
		await cart.addProduct(product);
	} else {
		const { quantity } = product.CartProduct;
		await cart.addProduct(product, { through: { quantity: quantity + 1 } });
	}
	res.redirect('/cart');
};

module.exports = addToCart;
