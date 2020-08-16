const { isEmail, isEmpty, isLength } = require('validator');

const { User } = require('../../models');
const ErrorHandler = require('../../utils/ErrorHandler');
const validateValue = require('../../utils/validateValue');

const userExists = async email => {
	return await User.exists({ email });
};

const validateEmail = async email =>
	await validateValue(email, [
		{
			validationFn: isEmail,
			errorMessage: 'Invalid email.'
		},
		{
			validationFn: userExists,
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

const validateUser = async ({ email, name, password }) => {
	const validationResults = await Promise.all([
		validateEmail(email),
		validateName(name),
		validatePassword(password)
	]);
	const errors = validationResults.flat();

	if (errors.length > 0) {
		throw new ErrorHandler(422, 'User validation failed.', errors);
	}
};

module.exports = validateUser;
