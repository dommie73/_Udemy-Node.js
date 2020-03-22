const { Product } = require('../../models');

const deleteProduct = async (req, res) => {
	const { id } = req.body;
	const { user } = req;

	const deletedProduct = await Product.findOneAndRemove({
		_id: id,
		userId: user
	});

	if (!deletedProduct) {
		req.flash('error', `You are not authorized to perform this action.`);
	} else {
		req.flash('success', `Product ${deletedProduct.name} has been removed.`);
	}

	res.redirect('/admin/products');
};

module.exports = deleteProduct;
