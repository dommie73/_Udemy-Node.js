const path = require('path');

const multer = require('multer');

const { generateToken, rootDir } = require('../utils/helpers');

const limits = {
	fileSize: 1 * 1024 * 1024
};

const fileFilter = (req, file, cb) => {
	if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
		const error = new multer.MulterError('INVALID_FILE_TYPE', file.fieldname);
		error.message =
			'File is not a valid image. Only jpg/jpeg/png files are allowed.';
		cb(error);
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

const upload = field => {
	const multerUpload = multer({ fileFilter, limits, storage }).single(field);
	return function(req, res, next) {
		multerUpload(req, res, function(err) {
			if (err instanceof multer.MulterError) {
				req.flash('error', err.message);
			}
			next();
		});
	};
};

module.exports = upload;
