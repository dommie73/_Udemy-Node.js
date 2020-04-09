const { Product } = require('../../models');

const updateProduct = async (req, res, next) => {
	try {
		const { file, user } = req;
		const { id, name, price, description } = req.body;
		const updatedProduct = await Product.findOneAndUpdate(
			{ _id: id, userId: user },
			{
				name,
				price,
				description,
				...(file && { image: file.filename })
			},
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
