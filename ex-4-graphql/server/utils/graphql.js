const compose = (...fns) => {
	return arg => fns.reduceRight((composed, fn) => fn(composed), arg);
};

const composeResolvers = (resolvers, ...guards) => {
	const composedGuards = compose(...guards);

	return Object.fromEntries(
		Object.entries(resolvers).map(([name, config]) => [
			name,
			{
				...config,
				resolve: composedGuards(config.resolve)
			}
		])
	);
};

const formatError = error => ({
	message: error.message,
	statusCode: error.originalError?.statusCode,
	data: error.originalError?.data
});

module.exports = {
	composeResolvers,
	formatError
};
