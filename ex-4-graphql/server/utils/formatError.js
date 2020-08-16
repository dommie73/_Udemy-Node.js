/*
  Error formatter for GraphQL.
 */

const formatError = error => ({
	message: error.message,
	statusCode: error.originalError?.statusCode,
	data: error.originalError?.data
});

module.exports = formatError;
