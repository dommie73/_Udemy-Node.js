const { Product } = require('../../models');

const getProductDetails = async (req, res, next) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);

		res.render('shop/product-details', {
			pageTitle: 'Product Details',
			product
		});
	} catch (err) {
		next(err);
	}
};

module.exports = getProductDetails;
