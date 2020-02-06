const Product = require('../../models/Product');

const getProducts = async (req, res) => {
	const products = await Product.fetchAll();
	res.render('admin/products-list', { pageTitle: 'Admin Products', products });
};

module.exports = getProducts;
