const { Product } = require('../../models');

const updateProduct = async (req, res) => {
	const { id, name, imageUrl, price, description } = req.body;
	await Product.update(
		{ name, imageUrl, price, description },
		{ where: { id } }
	);
	res.redirect(`/products/${id}`);
};

module.exports = updateProduct;
