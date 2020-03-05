const { Product } = require('../../models');

const getProducts = async (req, res) => {
	const { user } = req;
	const products = await Product.fetchAll({ userId: user._id });
	res.render('shop/products-list', { pageTitle: 'Admin Products', products });
};

module.exports = getProducts;
