const getEditProductForm = (req, res) => {
	const { id } = req.params;
	const { edit } = req.query;

	if (edit === 'true') {
		res.render('admin/edit-product', {
			pageTitle: 'Edit Product',
			productId: id,
			editing: true
		});
	} else {
		res.redirect(`/products/${id}`);
	}
};

module.exports = getEditProductForm;
