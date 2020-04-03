const { MulterError } = require('multer');

const errorCodes = {
	invalidFileType: 'INVALID_FILE_TYPE',
	fileSizeExceeded: 'LIMIT_FILE_SIZE'
};

const FileTypeError = new MulterError(errorCodes.invalidFileType);

const imageFilter = (req, file, cb) => {
	if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
		cb(FileTypeError);
	} else {
		cb(null, true);
	}
};

module.exports = {
	errorCodes,
	imageFilter
};
