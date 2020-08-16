const { GraphQLError, GraphQLScalarType, Kind } = require('graphql');
const { Types } = require('mongoose');

const { ObjectId } = Types;

const parseObjectId = value => {
	if (!ObjectId.isValid(value)) {
		throw new GraphQLError(`Cannot parse value ${value} to ObjectId`);
	}

	return value;
};

const MongoDBObjectId = new GraphQLScalarType({
	name: 'MongoDBObjectId',
	serialize(value) {
		if (!(value instanceof ObjectId)) {
			throw new GraphQLError(
				'MongoDBObjectId can serialize only ObjectId instances'
			);
		}

		return value.toHexString();
	},
	parseValue(value) {
		return parseObjectId(value);
	},
	parseLiteral(ast) {
		if (ast.kind !== Kind.STRING) {
			throw new GraphQLError(
				`MongoDBObjectId cannot represent non-string values`
			);
		}

		return parseObjectId(ast.value);
	}
});

module.exports = MongoDBObjectId;
