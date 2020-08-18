const { isLength } = require('validator');

const ErrorHandler = require('../../utils/ErrorHandler');
const validateValue = require('../../utils/validateValue');

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

const validatePost = async ({ title, content }) => {
	const validationResults = await Promise.all([
		validateTitle(title),
		validateContent(content)
	]);
	const errors = validationResults.flat();

	if (errors.length > 0) {
		throw new ErrorHandler(422, 'Post validation failed.', errors);
	}
};

module.exports = validatePost;
