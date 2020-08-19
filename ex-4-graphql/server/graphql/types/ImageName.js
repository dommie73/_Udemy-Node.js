const { GraphQLError, GraphQLScalarType, Kind } = require('graphql');
const { validate: uuidValidate } = require('uuid');

const validateImageName = value => {
	const [filename, extname] = value.trim().split('.');

	if (!(uuidValidate(filename) && ['jpeg', 'jpg', 'png'].includes(extname))) {
		throw new GraphQLError(`Cannot parse value ${value} to ImageName`);
	}

	return value;
};

const ImageName = new GraphQLScalarType({
	name: 'ImageName',
	serialize(value) {
		return validateImageName(value);
	},
	parseValue(value) {
		return validateImageName(value);
	},
	parseLiteral(ast) {
		if (ast.kind !== Kind.STRING) {
			throw new GraphQLError(
				`ImageName cannot represent values other than strings`
			);
		}

		return validateImageName(value);
	}
});

module.exports = ImageName;
