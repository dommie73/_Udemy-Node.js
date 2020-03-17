const { Product } = require('../../models');

const updateProduct = async (req, res) => {
	const { id, name, imageUrl, price, description } = req.body;

	await Product.findByIdAndUpdate(
		id,
		{ name, imageUrl, price, description },
		{ runValidators: true }
	);

	req.flash('success', `Product ${name} has been updated.`);
	res.redirect(`/admin/products`);
};

module.exports = updateProduct;
