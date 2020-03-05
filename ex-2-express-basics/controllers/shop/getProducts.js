const { Product } = require('../../models');

const getProducts = async (req, res) => {
	const products = await Product.fetchAll();
	res.render('shop/products-list', { pageTitle: 'Products', products });
};

module.exports = getProducts;
