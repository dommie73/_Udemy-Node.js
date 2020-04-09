const { User } = require('../models');
const { errorCodes } = require('./multer');

/* 
  This function iterates through a given object's property values, which have to be arrays of validators,
  and inserts the given middleware functions at the end of each array.
  Returns an object with the updated property values.
  This function is used in the index files under `validators` directory to avoid setting `validationErrors`
  middleware manually in each validator array.
*/
exports.combineValidatorsWithMiddlewares = (validators = {}, ...middlewares) =>
	Object.fromEntries(
		Object.entries(validators).map(([name, validatorsArray]) => [
			name,
			validatorsArray.concat(middlewares)
		])
	);

exports.isMatchingPassword = (value, { req }) => {
	if (value !== req.body.password) {
		throw new Error('Passwords do not match.');
	}
	return true;
};

exports.isEmailInUse = async email => {
	const user = await User.findOne({ email });

	if (!user) {
		return Promise.reject('This email is not associated with any account.');
	}
};

/* 
	This validator leverages the error object provided by `upload` middleware.
*/
exports.isImage = imageError => {
	if (!imageError) {
		return true;
	}
	switch (imageError.code) {
		case errorCodes.invalidFileType:
			throw new Error(
				'File is not a valid image. Only jpg/jpeg/png files are allowed.'
			);
		case errorCodes.fileSizeExceeded:
			throw new Error('File is too large. Maximum size allowed: 1 MB.');
		default:
			throw new Error('An unknown error has occurred.');
	}
};
