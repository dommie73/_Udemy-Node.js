const { GraphQLError, GraphQLScalarType, Kind } = require('graphql');
const { customValidators } = require('../../utils/validation');

const validateImageName = value => {
	if (!customValidators.isImageName(value)) {
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
