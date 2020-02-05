const Product = require('../../models/Product');

const createProduct = async (req, res) => {
	const { name, imageurl, price, desc } = req.body;
	const product = new Product(name, imageurl, price, desc);
	await product.save();
	res.redirect('/');
};

module.exports = createProduct;
