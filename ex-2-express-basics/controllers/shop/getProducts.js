const products = require('../../utils/products');

const getProducts = (req, res) => {
	res.render('shop', { pageTitle: 'Products', products });
};

module.exports = getProducts;
