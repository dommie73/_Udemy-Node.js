const getProductDetails = (req, res) => {
	const { id } = req.params;
	res.render('shop/product-details', {
		pageTitle: 'Product Details',
		productId: id
	});
};

module.exports = getProductDetails;
