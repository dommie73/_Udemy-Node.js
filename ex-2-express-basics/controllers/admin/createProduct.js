const { Product } = require('../../models');

const createProduct = async (req, res) => {
	const { user } = req;
	const { name, imageUrl, price, description } = req.body;

	await Product.create({
		name,
		imageUrl,
		price,
		description,
		userId: user
	});
	res.redirect('/admin/products');
};

module.exports = createProduct;
