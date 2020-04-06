const { validationResult } = require('express-validator');
const {
	moveUploadFromTmpToStatic,
	removeUploadFromTmp
} = require('../utils/files');

const validationErrors = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		const { file } = req;

		if (!errors.isEmpty()) {
			if (file) {
				await removeUploadFromTmp(file.filename);
			}

			req.flash(
				'error',
				errors.array({ onlyFirstError: true }).map(error => error.msg)
			);
			req.inputs.set();

			return req.saveSessionAndRedirect('back');
		}

		if (file) {
			await moveUploadFromTmpToStatic(file.filename);
		}

		next();
	} catch (err) {
		next(err);
	}
};

module.exports = validationErrors;
