const { Product } = require('../../models');

const createProduct = async (req, res, next) => {
	try {
		const { file, user } = req;
		const { name, price, description } = req.body;

		await Product.create({
			name,
			image: file && file.filename,
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
