const { Product } = require('../../models');

const getProducts = async (req, res, next) => {
	try {
		const { user } = req;
		const products = await Product.find(
			user ? { userId: { $ne: user._id } } : {}
		);

		res.render('shop/products-list', { pageTitle: 'Products', products });
	} catch (err) {
		next(err);
	}
};

module.exports = getProducts;
