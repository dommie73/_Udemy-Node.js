const getAddProductForm = (req, res) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add Product',
		editing: false
	});
};

module.exports = getAddProductForm;
