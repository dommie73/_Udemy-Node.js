const products = require('../../utils/products');

const saveProduct = (req, res) => {
	products.push({ name: req.body.name });
	console.log(products);
	res.redirect('/');
};

module.exports = saveProduct;
