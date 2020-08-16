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

module.exports = validateValue;
