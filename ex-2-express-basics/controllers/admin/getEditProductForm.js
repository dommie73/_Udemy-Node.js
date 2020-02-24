const getEditProductForm = async (req, res) => {
	const { user } = req;
	const { id } = req.params;
	const { edit } = req.query;

	if (edit === 'true') {
		const [product] = await user.getProducts({ where: { id } });
		res.render('admin/edit-product', {
			pageTitle: 'Edit Product',
			editing: true,
			product
		});
	} else {
		res.redirect(`/products/${id}`);
	}
};

module.exports = getEditProductForm;
