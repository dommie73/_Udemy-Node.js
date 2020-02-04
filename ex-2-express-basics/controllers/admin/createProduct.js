const products = require('../../utils/products');

const createProduct = (req, res) => {
	products.push({ name: req.body.name });
	console.log(products);
	res.redirect('/');
};

module.exports = createProduct;
