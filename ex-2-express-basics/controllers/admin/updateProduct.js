const { Product } = require('../../models');

const updateProduct = async (req, res, next) => {
	try {
		const { user } = req;
		const { id, name, imageUrl, price, description } = req.body;
		const updatedProduct = await Product.findOneAndUpdate(
			{ _id: id, userId: user },
			{ name, imageUrl, price, description },
			{ new: true, runValidators: true }
		);

		if (!updatedProduct) {
			req.flash('error', `You are not authorized to perform this action.`);
		} else {
			req.flash('success', `Product ${updatedProduct.name} has been updated.`);
		}

		req.saveSessionAndRedirect('/admin/products');
	} catch (err) {
		next(err);
	}
};

module.exports = updateProduct;
