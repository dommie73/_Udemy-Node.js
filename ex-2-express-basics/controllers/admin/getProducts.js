const { Product } = require('../../models');

const getProducts = async (req, res, next) => {
	try {
		const { user } = req;
		const products = await Product.find({ userId: user });

		res.render('shop/products-list', { pageTitle: 'Admin Products', products });
	} catch (err) {
		next(err);
	}
};

module.exports = getProducts;
