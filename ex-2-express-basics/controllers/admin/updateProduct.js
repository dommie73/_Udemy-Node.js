const { Product } = require('../../models');

const updateProduct = async (req, res) => {
	const { id, name, imageUrl, price, description } = req.body;
	const product = await Product.fetchById(id);
	await product.save({
		name,
		imageUrl,
		price: +price,
		description
	});
	res.redirect(`/products/${id}`);
};

module.exports = updateProduct;
