const { validate: uuidValidate } = require('uuid');

const { User } = require('../models');

/*
	Custom validators.
*/

const isImageName = value => {
	const [filename, extname] = value.trim().split('.');

	return uuidValidate(filename) && ['jpeg', 'jpg', 'png'].includes(extname);
};

const userExists = async email => {
	return await User.exists({ email });
};

/* 
  This function performs validity checks against the provided string value.
  Each validator can be an object of the following shape:
  {
    * validationFn - validation function,
    * options - an object which will be supplied as the second argument in the validationFn call
      (see validator.js library for examples),
    * not - boolean; if true, reverses the result of the validationFn call; defaults to false,
    * errorMessage - a string which describes why the validation failed
  }
  Important: this function handles both sync and async validators so it always returns a promise!
*/

const validateValue = async (value, validators, onlyFirstError = true) => {
	const errors = [];

	for (const {
		validationFn,
		not = false,
		options,
		errorMessage
	} of validators) {
		let isValid = await validationFn(value, options);

		if (not) isValid = !isValid;
		if (!isValid) {
			errors.push(errorMessage);
			if (onlyFirstError) break;
		}
	}

	return errors;
};

/* 
	This function simply merges arrays of validation errors and then flattens the resulting array.
	Should be used in conjunction with `validateValue` function.
*/
const combineValidations = async (...validations) => {
	const validationResults = await Promise.all(validations);

	return validationResults.flat();
};

module.exports = {
	combineValidations,
	customValidators: {
		isImageName,
		userExists
	},
	validateValue
};
