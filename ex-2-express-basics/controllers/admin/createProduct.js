const { Product } = require('../../models');

const createProduct = async (req, res, next) => {
	try {
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
		req.saveSessionAndRedirect('/admin/products');
	} catch (err) {
		next(err);
	}
};

module.exports = createProduct;
