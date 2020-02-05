const getProducts = (req, res) => {
	res.render('admin/products-list', { pageTitle: 'Admin Products' });
};

module.exports = getProducts;
