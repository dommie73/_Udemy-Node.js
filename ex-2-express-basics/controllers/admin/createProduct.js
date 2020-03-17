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

	req.flash('success', `Product ${name} has been created.`);
	res.redirect('/admin/products');
};

module.exports = createProduct;
