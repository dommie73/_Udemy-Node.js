const {
	GraphQLList,
	GraphQLNonNull: NonNull,
	GraphQLObjectType,
	GraphQLString
} = require('graphql');

const DateTime = require('./DateTime');
const MongoDBObjectId = require('./MongoDBObjectId');

const User = new GraphQLObjectType({
	name: 'User',
	fields: () => {
		const Post = require('./Post');

		return {
			_id: { type: new NonNull(MongoDBObjectId) },
			email: { type: new NonNull(GraphQLString) },
			password: { type: GraphQLString },
			name: { type: new NonNull(GraphQLString) },
			status: { type: new NonNull(GraphQLString) },
			posts: {
				type: new NonNull(new GraphQLList(new NonNull(Post)))
			},
			createdAt: { type: new NonNull(DateTime) },
			updatedAt: { type: new NonNull(DateTime) }
		};
	}
});

module.exports = User;
