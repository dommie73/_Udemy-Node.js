const Product = require('../../models/Product');

const createProduct = async (req, res) => {
	const { name } = req.body;
	const product = new Product(name);
	await product.save();
	res.redirect('/');
};

module.exports = createProduct;
