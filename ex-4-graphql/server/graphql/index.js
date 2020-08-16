const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const userMutations = require('./mutations/user');
const userQueries = require('./queries/user');

const rootQuery = new GraphQLObjectType({
	name: 'Query',
	fields: {
		...userQueries
	}
});

const rootMutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		...userMutations
	}
});

const schema = new GraphQLSchema({
	query: rootQuery,
	mutation: rootMutation
});

module.exports = schema;
