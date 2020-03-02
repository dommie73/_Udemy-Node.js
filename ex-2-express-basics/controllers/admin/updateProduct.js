const Product = require('../../models/Product');

const updateProduct = async (req, res) => {
	const { id, name, imageUrl, price, description } = req.body;
	const product = new Product(name, imageUrl, price, description, id);

	await product.save();
	res.redirect(`/products/${id}`);
};

module.exports = updateProduct;
