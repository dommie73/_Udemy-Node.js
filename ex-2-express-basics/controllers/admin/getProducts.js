const { Product } = require('../../models');

const getProducts = async (req, res) => {
	const { user } = req;
	const products = await Product.find({ userId: user });

	res.render('shop/products-list', { pageTitle: 'Admin Products', products });
};

module.exports = getProducts;
