const { Product } = require('../../models');

const getEditProductForm = async (req, res, next) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);

		res.render('admin/edit-product', {
			pageTitle: 'Edit Product',
			editing: true,
			product
		});
	} catch (err) {
		next(err);
	}
};

module.exports = getEditProductForm;
