const Product = require('../../models/Product');

const deleteProduct = async (req, res) => {
	const { id } = req.body;
	await Product.deleteById(id);
	res.redirect('/admin/products');
};

module.exports = deleteProduct;
