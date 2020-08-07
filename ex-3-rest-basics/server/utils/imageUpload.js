const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const ErrorHandler = require('./ErrorHandler');

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
	destination: path.join(
		path.dirname(process.mainModule.filename),
		'public',
		'images'
	),
	filename: (req, file, cb) => {
		cb(null, uuidv4() + path.extname(file.originalname));
	}
});

module.exports = {
	fileFilter,
	limits,
	storage
};
