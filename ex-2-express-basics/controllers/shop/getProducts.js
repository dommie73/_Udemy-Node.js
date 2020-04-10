const { Product } = require('../../models');

const getProducts = async (req, res, next) => {
	try {
		const { user } = req;
		const currentPage = +req.query.page || 1;
		const { products, totalPages } = await Product.paginate(
			user ? { userId: { $ne: user._id } } : {},
			{ currentPage }
		);

		res.render('shop/products-list', {
			pageTitle: 'Products',
			products,
			currentPage,
			totalPages
		});
	} catch (err) {
		next(err);
	}
};

module.exports = getProducts;
