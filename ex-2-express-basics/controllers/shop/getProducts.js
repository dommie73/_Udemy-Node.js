const Product = require('../../models/Product');

const getProducts = (req, res) => {
	const products = Product.fetchAll();
	res.render('shop', { pageTitle: 'Products', products });
};

module.exports = getProducts;
