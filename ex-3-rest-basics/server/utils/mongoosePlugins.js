const isPositiveInt = value => Number.isInteger(value) && value > 0;

const paginate = (schema, name = 'docs') => {
	schema.static('paginate', async function (query = {}, options = {}) {
		const defaultOptions = {
			currentPage: 1,
			limit: 2
		};

		if (!isPositiveInt(options.currentPage)) {
			options.currentPage = defaultOptions.currentPage;
		}

		if (!isPositiveInt(options.limit)) {
			options.limit = defaultOptions.limit;
		}

		options = {
			...defaultOptions,
			...options,
			name
		};

		const offset = (options.currentPage - 1) * options.limit;
		const [items, totalItems] = await Promise.all([
			this.find(query).skip(offset).limit(options.limit).lean(),
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
