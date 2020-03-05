const { Product } = require('../../models');

const createProduct = async (req, res) => {
	const { user } = req;
	const { name, imageUrl, price, description } = req.body;
	const product = new Product(
		name,
		imageUrl,
		price,
		description,
		null,
		user._id
	);
	await product.save();
	res.redirect('/admin/products');
};

module.exports = createProduct;
