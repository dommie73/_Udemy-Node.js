const { Product } = require('../../models');

const getEditProductForm = async (req, res) => {
	const { id } = req.params;
	const { edit } = req.query;

	if (edit === 'true') {
		const product = await Product.findById(id);

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
