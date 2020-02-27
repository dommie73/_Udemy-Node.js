const Product = require('../../models/Product');

const getProductDetails = async (req, res) => {
	const { id } = req.params;
	const product = await Product.findByPk(id);

	res.render('shop/product-details', {
		pageTitle: 'Product Details',
		product
	});
};

module.exports = getProductDetails;
