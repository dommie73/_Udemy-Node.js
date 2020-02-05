const getAddProductForm = (req, res) => {
	res.render('admin/add-product', { pageTitle: 'Add Product' });
};

module.exports = getAddProductForm;
