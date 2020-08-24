const { GraphQLError, GraphQLScalarType, Kind } = require('graphql');

const parseDate = value => {
	const date = new Date(value);

	if (isNaN(date.valueOf())) {
		throw new GraphQLError(`Cannot parse value ${value} to date`);
	}

	return date;
};

const DateTime = new GraphQLScalarType({
	name: 'DateTime',
	serialize(value) {
		return parseDate(value).toJSON();
	},
	parseValue(value) {
		return parseDate(value);
	},
	parseLiteral(ast) {
		if (ast.kind !== Kind.STRING || ast.kind !== Kind.INT) {
			throw new GraphQLError(
				`DateTime cannot represent values other than strings and numbers`
			);
		}

		return parseDate(value);
	}
});

module.exports = DateTime;
