const Product = require('../../models/Product');

const getProducts = async (req, res) => {
	const products = await Product.fetchAll();
	res.render('shop/products-list', { pageTitle: 'Products', products });
};

module.exports = getProducts;
