const createProduct = async (req, res) => {
	const { user } = req;
	const { name, imageUrl, price, description } = req.body;
	await user.createProduct({ name, imageUrl, price, description });
	res.redirect('/admin/products');
};

module.exports = createProduct;
