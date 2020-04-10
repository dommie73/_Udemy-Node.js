const { Product } = require('../../models');

const getProducts = async (req, res, next) => {
	try {
		const { user } = req;
		const currentPage = +req.query.page || 1;
		const { products, totalPages } = await Product.paginate(
			{ userId: user },
			{ currentPage }
		);

		res.render('shop/products-list', {
			pageTitle: 'Admin Products',
			products,
			currentPage,
			totalPages
		});
	} catch (err) {
		next(err);
	}
};

module.exports = getProducts;
