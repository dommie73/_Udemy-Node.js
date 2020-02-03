const products = require('../../utils/products');

const displayItems = (req, res) => {
	res.render('shop', { pageTitle: 'Products', products });
};

module.exports = displayItems;
