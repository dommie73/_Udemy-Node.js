const paginate = (schema, name = 'docs') => {
	schema.static('paginate', async function (query = {}, options = {}) {
		const defaultOptions = {
			currentPage: 1,
			limit: 2,
			populate: ''
		};

		options = {
			...defaultOptions,
			...options,
			name
		};

		const offset = (options.currentPage - 1) * options.limit;
		const [items, totalItems] = await Promise.all([
			this.find(query)
				.populate(options.populate)
				.skip(offset)
				.limit(options.limit)
				.lean(),
			this.countDocuments(query).exec()
		]);
		const totalPages = Math.ceil(totalItems / options.limit);

		return {
			[options.name]: items,
			totalItems,
			totalPages
		};
	});
};

module.exports = {
	paginate
};
