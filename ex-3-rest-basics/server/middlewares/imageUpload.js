const multer = require('multer');

const { fileFilter, limits, storage } = require('../utils/imageUpload');

const uploadImage = field => {
	return multer({ fileFilter, limits, storage }).single(field);
};

module.exports = uploadImage;
