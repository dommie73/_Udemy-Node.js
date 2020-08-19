const multer = require('multer');

const ErrorHandler = require('../utils/ErrorHandler');
const { fileFilter, limits, storage } = require('../utils/imageUpload');

const uploadImage = field => {
	const multerUpload = multer({
		fileFilter,
		limits,
		storage
	}).single(field);

	return function (req, res, next) {
		try {
			if (!req.isAuthenticated) {
				throw new ErrorHandler(401, 'Invalid credentials.');
			}

			multerUpload(req, res, err => {
				if (err) {
					return next(err);
				}

				const { file } = req;

				if (file === void 0) {
					res.status(200).send({ message: 'No image provided.' });
				} else {
					res
						.status(201)
						.send({ message: 'File uploaded.', [field]: file.filename });
				}
			});
		} catch (err) {
			next(err);
		}
	};
};

module.exports = uploadImage;
