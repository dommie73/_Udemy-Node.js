const {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
	GraphQLInt
} = require('graphql');

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			text: {
				type: GraphQLString,
				resolve() {
					return 'Hello world!';
				}
			},
			value: {
				type: GraphQLInt,
				resolve() {
					return 42;
				}
			}
		}
	})
});

module.exports = schema;
