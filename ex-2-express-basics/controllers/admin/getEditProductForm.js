const getEditProductForm = (req, res) => {
	const { id } = req.params;
	res.render('admin/edit-product', {
		pageTitle: 'Edit Product',
		productId: id
	});
};

module.exports = getEditProductForm;
