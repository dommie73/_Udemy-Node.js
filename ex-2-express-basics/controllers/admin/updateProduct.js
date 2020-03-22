const { Product } = require('../../models');

const updateProduct = async (req, res) => {
	const { id, name, imageUrl, price, description } = req.body;
	const { user } = req;

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

	res.redirect(`/admin/products`);
};

module.exports = updateProduct;
