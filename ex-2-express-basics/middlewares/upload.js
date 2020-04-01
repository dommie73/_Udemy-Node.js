const path = require('path');

const multer = require('multer');

const { generateToken, rootDir } = require('../utils/helpers');

const limits = {
	fileSize: 1 * 1024 * 1024
};

const fileFilter = (req, file, cb) => {
	if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
		cb(null, false);
	} else {
		cb(null, true);
	}
};

const storage = multer.diskStorage({
	destination: path.join(rootDir, 'tmp', 'uploads'),
	filename: (req, file, cb) => {
		generateToken(16)
			.then(token => Date.now() + token + path.extname(file.originalname))
			.then(randomizedFilename => cb(null, randomizedFilename))
			.catch(err => cb(err));
	}
});

module.exports = multer({ fileFilter, limits, storage });
