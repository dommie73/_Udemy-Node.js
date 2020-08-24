const { isEmail, isEmpty, isLength } = require('validator');

const {
	combineValidations,
	customValidators,
	validateValue
} = require('../utils/validation');

const validateEmail = async email =>
	await validateValue(email, [
		{
			validationFn: isEmail,
			errorMessage: 'Invalid email.'
		},
		{
			validationFn: customValidators.userExists,
			not: true,
			errorMessage: 'Email already in use.'
		}
	]);

const validateName = name =>
	validateValue(name.trim(), [
		{
			validationFn: isEmpty,
			not: true,
			errorMessage: 'Name cannot be blank.'
		}
	]);

const validatePassword = password =>
	validateValue(password, [
		{
			validationFn: isLength,
			options: { min: 5 },
			errorMessage: 'Password too short.'
		}
	]);

const validateStatus = status =>
	validateValue(status.trim(), [
		{
			validationFn: isEmpty,
			not: true,
			errorMessage: 'Status cannot be blank.'
		}
	]);

const validateUser = async ({ email, name, password, status }) =>
	await combineValidations(
		validateEmail(email),
		validateName(name),
		validatePassword(password)
	);

module.exports = validateUser;
module.exports.status = validateStatus;
