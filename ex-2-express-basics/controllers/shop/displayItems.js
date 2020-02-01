const products = require('../../utils/products');

const displayItems = (req, res) => {
	res.render('shop', { products });
};

module.exports = displayItems;
