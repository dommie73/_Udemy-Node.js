const { Product } = require('../../models');

const deleteProduct = async (req, res) => {
	const { id } = req.body;
	await Product.destroy({ where: { id } });
	res.redirect('/admin/products');
};

module.exports = deleteProduct;
