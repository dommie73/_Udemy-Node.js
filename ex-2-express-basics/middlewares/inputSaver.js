const { validationResult } = require('express-validator');

/*** Helper functions ***/

/* 
  Returns a function which removes the input values from session and returns the copy 
  of these values. 
*/
const _get = req => () => {
	const inputs = { ...req.session.inputs };
	delete req.session.inputs;
	return inputs;
};

/* 
  Returns a function which saves the input values from `req.body` in the current session.
  Options:
		* exclude - an array of strings - keys to ignore; their values will be set to an empty string
		  before saving
*/
const _set = (req, options = {}) => () => {
	const invalidFields = validationResult(req)
		.array({ onlyFirstError: true })
		.map(error => error.param);

	const inputs = Object.fromEntries(
		Object.entries(req.body).map(([field, value]) => [
			field,
			{ value, invalid: invalidFields.includes(field) }
		])
	);

	if (Array.isArray(options.exclude)) {
		options.exclude.forEach(field => {
			if (inputs.hasOwnProperty(field)) {
				inputs[field].value = '';
			}
		});
	}

	req.session.inputs = inputs;
};

/*** Middleware ***/

/* 
  This middleware works very similarly to the one provided by `connect-flash` library,
  i.e. it stores the input values in a session object and clears these values immediately 
  after displaying them back to the user.
*/
const inputSaver = (req, res, next) => {
	req.inputs = {
		get: _get(req),
		set: _set(req, { exclude: ['password', 'confirmPassword', '_csrf'] })
	};
	res.locals.inputs = req.inputs.get();
	next();
};

module.exports = inputSaver;
