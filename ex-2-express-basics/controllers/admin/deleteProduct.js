const { Product } = require('../../models');

const deleteProduct = async (req, res, next) => {
	try {
		const { user } = req;
		const { id } = req.body;
		const deletedProduct = await Product.findOneAndRemove({
			_id: id,
			userId: user
		});

		if (!deletedProduct) {
			req.flash('error', `You are not authorized to perform this action.`);
		} else {
			req.flash('success', `Product ${deletedProduct.name} has been removed.`);
		}

		req.saveSessionAndRedirect('/admin/products');
	} catch (err) {
		next(err);
	}
};

module.exports = deleteProduct;
