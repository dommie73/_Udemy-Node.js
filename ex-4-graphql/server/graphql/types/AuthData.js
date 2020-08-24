const {
	GraphQLNonNull: NonNull,
	GraphQLObjectType,
	GraphQLString
} = require('graphql');

const MongoDBObjectId = require('./MongoDBObjectId');

const AuthData = new GraphQLObjectType({
	name: 'AuthData',
	fields: {
		userId: { type: new NonNull(MongoDBObjectId) },
		token: { type: new NonNull(GraphQLString) }
	}
});

module.exports = AuthData;
