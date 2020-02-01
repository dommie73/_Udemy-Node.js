const path = require('path');

const rootDir = require('../utils/path');

const notFound = (req, res) => {
	res.status(404).sendFile(path.join(rootDir, 'views', 'not-found.html'));
};

module.exports = notFound;
