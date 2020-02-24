const getProducts = async (req, res) => {
	const { user } = req;
	const products = await user.getProducts();
	res.render('shop/products-list', { pageTitle: 'Admin Products', products });
};

module.exports = getProducts;
