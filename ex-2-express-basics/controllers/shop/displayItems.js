const path = require('path');

const rootDir = require('../../utils/path');

const displayItems = (req, res) => {
	res.sendFile(path.join(rootDir, 'views', 'shop.html'));
};

module.exports = displayItems;
