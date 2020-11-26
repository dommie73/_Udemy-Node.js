const multer = require('multer');

const ErrorHandler = require('../utils/ErrorHandler');
const { fileFilter, limits, storage } = require('../utils/imageUpload');

const uploadImage = field => {
	const multerUpload = multer({ fileFilter, limits, storage }).single(field);

	return function (req, res, next) {
		multerUpload(req, res, err => {
			if (err instanceof multer.MulterError) {
				next(new ErrorHandler(422, err.message));
			}
			next(err);
		});
	};
};

module.exports = uploadImage;
