const path = require('path');

const rootDir = require('../../utils/path');

const addProduct = (req, res) => {
	res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};

module.exports = addProduct;
