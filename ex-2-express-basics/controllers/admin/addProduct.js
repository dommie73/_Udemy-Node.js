const addProduct = (req, res) => {
	res.render('add-product', {
		pageTitle: 'Add Product',
		css: ['product-form.css']
	});
};

module.exports = addProduct;
