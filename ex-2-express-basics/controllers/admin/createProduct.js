const Product = require('../../models/Product');

const createProduct = (req, res) => {
	const { name } = req.body;
	const product = new Product(name);
	product.save();
	res.redirect('/');
};

module.exports = createProduct;
