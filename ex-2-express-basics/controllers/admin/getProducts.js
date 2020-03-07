const { Product } = require('../../models');

const getProducts = async (req, res) => {
	const products = await Product.find();

	res.render('shop/products-list', { pageTitle: 'Admin Products', products });
};

module.exports = getProducts;
