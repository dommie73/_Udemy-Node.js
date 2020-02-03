const addProduct = (req, res) => {
	res.render('add-product', { pageTitle: 'Add Product' });
};

module.exports = addProduct;
