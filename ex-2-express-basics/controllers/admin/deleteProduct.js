const { Product } = require('../../models');

const deleteProduct = async (req, res) => {
	const { user } = req;
	const { id } = req.body;
	await Product.destroy({ where: { id, userId: user.id } });
	res.redirect('/admin/products');
};

module.exports = deleteProduct;
