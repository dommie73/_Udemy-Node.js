const { Product } = require('../../models');

const getProducts = async (req, res) => {
	const { user } = req;
	const products = await Product.find({ userId: { $ne: user._id } });

	res.render('shop/products-list', { pageTitle: 'Products', products });
};

module.exports = getProducts;
