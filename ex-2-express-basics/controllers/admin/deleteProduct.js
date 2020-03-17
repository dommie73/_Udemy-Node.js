const { Product } = require('../../models');

const deleteProduct = async (req, res) => {
	const { id } = req.body;

	await Product.findByIdAndRemove(id);

	req.flash('success', 'Product has been removed.');
	res.redirect('/admin/products');
};

module.exports = deleteProduct;
