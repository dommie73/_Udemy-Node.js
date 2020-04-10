exports.paginate = (schema, name = 'docs') => {
	schema.static('paginate', async function(query = {}, options = {}) {
		const defaultOptions = {
			currentPage: 1,
			limit: 12
		};

		options = {
			...defaultOptions,
			...options,
			name
		};

		const offset = (options.currentPage - 1) * options.limit;
		const [docs, totalDocs] = await Promise.all([
			this.find(query)
				.skip(offset)
				.limit(options.limit)
				.lean(),
			this.countDocuments(query).exec()
		]);
		const totalPages = Math.ceil(totalDocs / options.limit);

		return {
			[options.name]: docs,
			totalPages
		};
	});
};
