const { isLength } = require('validator');

const { combineValidations, validateValue } = require('../utils/validation');

const validateTitle = title =>
	validateValue(title.trim(), [
		{
			validationFn: isLength,
			options: { min: 5 },
			errorMessage: 'Title too short.'
		}
	]);

const validateContent = content =>
	validateValue(content.trim(), [
		{
			validationFn: isLength,
			options: { min: 5 },
			errorMessage: 'Content too short.'
		}
	]);

const validatePost = async ({ title, content }) =>
	await combineValidations(validateTitle(title), validateContent(content));

module.exports = validatePost;
