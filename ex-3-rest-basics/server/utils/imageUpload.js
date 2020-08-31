const debug = require('debug')('app:utils:imageUpload');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');
const path = require('path');

const ErrorHandler = require('./ErrorHandler');

const testPath = path.resolve('tests', 'tmp');

const publicPath = path.join(
	path.dirname(require.main.filename),
	'public',
	'images'
);

const destination = process.env.NODE_ENV === 'test' ? testPath : publicPath;

const fileFilter = (req, file, cb) => {
	if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
		cb(new ErrorHandler(422, 'Invalid file type.'));
	} else {
		cb(null, true);
	}
};

const limits = {
	fileSize: 1 * 1024 * 1024
};

const storage = multer.diskStorage({
	destination,
	filename: (req, file, cb) => {
		cb(null, uuidv4() + path.extname(file.originalname));
	}
});

const deleteImage = async file => {
	try {
		await fs.unlink(path.join(destination, file));
	} catch (err) {
		if (err.code === 'ENOENT') {
			debug('%s', `info: unable to find image ${file} in ${destination}`);
		} else {
			throw err;
		}
	}
};

module.exports = {
	deleteImage,
	destination,
	fileFilter,
	limits,
	storage
};
