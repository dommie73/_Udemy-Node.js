const { Product } = require('../../models');

const updateProduct = async (req, res) => {
	const { id, name, imageUrl, price, description } = req.body;

	await Product.findByIdAndUpdate(
		id,
		{ name, imageUrl, price, description },
		{ runValidators: true }
	);
	res.redirect(`/products/${id}`);
};

module.exports = updateProduct;
