const { Product } = require('../../models');

const getProductDetails = async (req, res) => {
	const { id } = req.params;
	const product = await Product.fetchById(id);

	res.render('shop/product-details', {
		pageTitle: 'Product Details',
		product
	});
};

module.exports = getProductDetails;
