const Product = require('../../models/Product');

const createProduct = async (req, res) => {
	const { name, imageUrl, price, description } = req.body;
	await Product.create({ name, imageUrl, price, description });
	res.redirect('/admin/products');
};

module.exports = createProduct;
