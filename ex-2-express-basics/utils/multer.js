const { MulterError } = require('multer');

const imageFilter = (req, file, cb) => {
	if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
		const error = new MulterError('INVALID_FILE_TYPE', file.fieldname);
		error.message =
			'File is not a valid image. Only jpg/jpeg/png files are allowed.';
		cb(error);
	} else {
		cb(null, true);
	}
};

module.exports = { imageFilter };
