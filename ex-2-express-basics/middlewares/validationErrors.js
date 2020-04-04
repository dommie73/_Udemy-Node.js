const path = require('path');

const { validationResult } = require('express-validator');
const { move, remove } = require('fs-extra');

const { rootDir } = require('../utils/helpers');

const validationErrors = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		const { file } = req;

		if (!errors.isEmpty()) {
			if (file) {
				await remove(file.path);
			}

			req.flash(
				'error',
				errors.array({ onlyFirstError: true }).map(error => error.msg)
			);
			req.inputs.set();

			return req.saveSessionAndRedirect('back');
		}

		if (file) {
			await move(
				file.path,
				path.join(rootDir, 'public', 'uploads', file.filename)
			);
		}

		next();
	} catch (err) {
		next(err);
	}
};

module.exports = validationErrors;
