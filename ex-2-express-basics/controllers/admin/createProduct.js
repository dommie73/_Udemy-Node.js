const Product = require('../../models/Product');

const createProduct = async (req, res) => {
	const { name, imageUrl, price, description } = req.body;
	const product = new Product(name, imageUrl, price, description);
	await product.save();
	res.redirect('/admin/products');
};

module.exports = createProduct;
